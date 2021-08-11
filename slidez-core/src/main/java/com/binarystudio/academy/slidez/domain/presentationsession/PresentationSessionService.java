package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.*;
import com.binarystudio.academy.slidez.domain.presentationsession.enums.WebSocketStatus;
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

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration) {
		// 1. Load all interactive elements for presentation
		// 2. For each such element create event-initiator (like PollCreatedEvt)
		DomainEvent event = new PollCreatedEvent("Do you like Java?", Arrays.asList("Yes", "Definitely", "Absolutely"));
		// 3. Create PresentationEventStore
		PresentationEventStore presentationEventStore = new PresentationEventStore();
		// 4. For each event call PresentationEventStore.apply(event)
		presentationEventStore = presentationEventStore.applyEvent(event);
		// 5. Add to repository (eventCode [link], PresentationEventStore )
		Optional<Link> linkOptional = linkService.leaseLink(leaseDuration);
		if (linkOptional.isEmpty()) {
			return Optional.empty();
		}
		Session session = sessionService.createForPresentation(dto.getPresentationId());
		Link link = linkOptional.get();
		link.setSession(session);
		linkService.update(link);
		if (inMemoryPresentationEventStoreRepository.add(link.getLink(), presentationEventStore)) {
			return Optional.of(new CreateSessionResponseDto(link.getLink()));
		}
		// return link
		return Optional.empty();
	}

	public SnapshotResponseDto getSnapshot(String link) {
		PresentationEventStore eventStore = inMemoryPresentationEventStoreRepository.get(link);
		SnapshotResponseDto snapshotResponseDto = new SnapshotResponseDto();
		if (eventStore == null) {
			snapshotResponseDto.setStatus(WebSocketStatus.NOT_FOUND);
			return snapshotResponseDto;
		}
		Snapshot snapshot = eventStore.snapshot();
		snapshotResponseDto.setPolls(snapshot.getPolls());
		return snapshotResponseDto;
	}

	public PollCreatedResponseDto createPoll(String link, CreatePollRequestDto dto) {
		PresentationEventStore eventStore = inMemoryPresentationEventStoreRepository.get(link);
		PollCreatedResponseDto pollCreatedResponseDto = new PollCreatedResponseDto();
		if (eventStore == null) {
			pollCreatedResponseDto.setStatus(WebSocketStatus.NOT_FOUND);
			return pollCreatedResponseDto;
		}
		PollCreatedEvent pollCreatedEvent = new PollCreatedEvent(dto.getName(), dto.getOptions());
		eventStore.applyEvent(pollCreatedEvent);
		List<Poll> polls = eventStore.snapshot().getPolls();
		Poll last = polls.get(polls.size() - 1);
		PollMapper pollMapper = PollMapper.INSTANCE;
		return pollMapper.pollToPollCreatedDtoMapper(last);
	}

	public PollAnsweredDto answerPoll(String link, AnswerPollDto dto) {
		PresentationEventStore eventStore = inMemoryPresentationEventStoreRepository.get(link);
		PollAnsweredDto pollAnsweredDto = new PollAnsweredDto();
		if (eventStore == null) {
			pollAnsweredDto.setStatus(WebSocketStatus.NOT_FOUND);
			return pollAnsweredDto;
		}
		PollAnsweredEvent pollAnsweredEvent = new PollAnsweredEvent(dto.getPollId(), dto.getOption());
		eventStore.applyEvent(pollAnsweredEvent);
		return new PollAnsweredDto(dto.getPollId(), dto.getOption());
	}

}
