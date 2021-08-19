package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.link.LinkService;
import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.AnswerPollDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.CreatePollRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.PollAnsweredDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.SnapshotResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.event.PollAnsweredEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.event.PollCreatedEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.snapshot.Snapshot;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PresentationSessionService {
    private final String MOCK_POLL_ID = "ed60e789-ab15-4756-b95e-218b43b6dfcf";

	private final LinkService linkService;

	private final InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository;

	private final SessionService sessionService;

    private final PollService pollService;

    @Autowired
	public PresentationSessionService(LinkService linkService,
			InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository,
			SessionService sessionService, PollService pollService) {
		this.linkService = linkService;
		this.inMemoryPresentationEventStoreRepository = inMemoryPresentationEventStoreRepository;
		this.sessionService = sessionService;
        this.pollService = pollService;
	}

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration)
			throws IncorrectLeaseDurationException {
		// 1. Load all interactive elements for presentation
		// 2. For each such element create event-initiator (like PollCreatedEvt)
        // Hardcoded sample TO-DO
        UUID pollFromDBId = UUID.fromString(MOCK_POLL_ID);
        Poll poll = getPollFromDbById(pollFromDBId);
		DomainEvent event = new PollCreatedEvent(poll);

		// 3. Create PresentationEventStore
		PresentationEventStore presentationEventStore = new PresentationEventStore();
		// 4. For each event call PresentationEventStore.apply(event)
		presentationEventStore = presentationEventStore.applyEvent(event);
		// 5. Add to repository (eventCode [link], PresentationEventStore )
		Session session = sessionService.createForPresentation(dto.getPresentationId());
		Link link = linkService.leaseLink(leaseDuration);
		link.setSession(session);
		linkService.update(link);
		if (inMemoryPresentationEventStoreRepository.add(link.getLink(), presentationEventStore)) {
			return Optional.of(new CreateSessionResponseDto(link.getLink()));
		}
		// return link
		return Optional.empty();
	}

	public Optional<SnapshotResponseDto> getSnapshot(String link) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return Optional.empty();
		}
		Snapshot snapshot = eventStore.get().snapshot();
		SnapshotResponseDto snapshotResponseDto = new SnapshotResponseDto();
		snapshotResponseDto.setPolls(snapshot.getPolls());
		return Optional.of(snapshotResponseDto);
	}

	public Optional<PollCreatedResponseDto> createPoll(String link, CreatePollRequestDto dto) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return Optional.empty();
		}
		Poll poll = getPollFromDbById(dto.getId());
		PollCreatedEvent pollCreatedEvent = new PollCreatedEvent(poll);
		eventStore.get().applyEvent(pollCreatedEvent);
		List<Poll> polls = eventStore.get().snapshot().getPolls();
		Poll last = polls.get(polls.size() - 1);
		PollCreatedResponseDto pollCreatedResponseDto = PollMapper.INSTANCE.pollToPollCreatedDtoMapper(last);
		return Optional.of(pollCreatedResponseDto);
	}

	public Optional<PollAnsweredDto> answerPoll(String link, AnswerPollDto dto) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return Optional.empty();
		}
		PollAnsweredEvent pollAnsweredEvent = new PollAnsweredEvent(dto.getPollId(), dto.getOptionId());
		eventStore.get().applyEvent(pollAnsweredEvent);
		PollAnsweredDto pollAnsweredDto = new PollAnsweredDto(dto.getPollId(), dto.getOptionId());
		return Optional.of(pollAnsweredDto);
	}

	private Poll getPollFromDbById(UUID pollFromDBId) {
        Optional<PollResponseDto> pollResponseDtoOptional = pollService.getById(pollFromDBId);
        var mapper = PollMapper.INSTANCE;
        Poll poll = mapper.pollResponseDtoToPoll(pollResponseDtoOptional.get());
        return poll;
    }

}
