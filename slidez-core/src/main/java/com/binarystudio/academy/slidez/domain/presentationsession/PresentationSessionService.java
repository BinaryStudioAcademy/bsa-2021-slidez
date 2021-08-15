package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.*;
import com.binarystudio.academy.slidez.domain.presentationsession.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.event.PollAnsweredEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.event.PollCreatedEvent;
import com.binarystudio.academy.slidez.domain.link.LinkService;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.presentationsession.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.snapshot.Snapshot;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PresentationSessionService {

	private final LinkService linkService;

	private final InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository;

	private final SessionService sessionService;

	@Autowired
	public PresentationSessionService(LinkService linkService,
			InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository,
			SessionService sessionService) {
		this.linkService = linkService;
		this.inMemoryPresentationEventStoreRepository = inMemoryPresentationEventStoreRepository;
		this.sessionService = sessionService;
	}

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration)
			throws IncorrectLeaseDurationException {
		// 1. Load all interactive elements for presentation
		// 2. For each such element create event-initiator (like PollCreatedEvt)
		DomainEvent event = new PollCreatedEvent("Do you like Java?", Arrays.asList("Yes", "Definitely", "Absolutely"));
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
		PollCreatedEvent pollCreatedEvent = new PollCreatedEvent(dto.getName(), dto.getOptions());
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
		PollAnsweredEvent pollAnsweredEvent = new PollAnsweredEvent(dto.getPollId(), dto.getOption());
		eventStore.get().applyEvent(pollAnsweredEvent);
		PollAnsweredDto pollAnsweredDto = new PollAnsweredDto(dto.getPollId(), dto.getOption());
		return Optional.of(pollAnsweredDto);
	}

}
