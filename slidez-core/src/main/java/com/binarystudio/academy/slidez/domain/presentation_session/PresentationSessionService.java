package com.binarystudio.academy.slidez.domain.presentation_session;

import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.AnswerPollDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.CreatePollRequestDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.PollAnsweredDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.SnapshotResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.event.PollAnsweredEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import com.binarystudio.academy.slidez.domain.presentation_session.snapshot.Snapshot;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PresentationSessionService {

	private final InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository;

	private final SessionService sessionService;

	private final PollService pollService;

	@Autowired
	public PresentationSessionService(InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository,
			SessionService sessionService, PollService pollService) {
		this.inMemoryPresentationEventStoreRepository = inMemoryPresentationEventStoreRepository;
		this.sessionService = sessionService;
		this.pollService = pollService;
	}

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration)
			throws IncorrectLeaseDurationException {
		Session session = sessionService.createForPresentation(dto.getPresentationId(), leaseDuration);
		String shortcode = session.getLink().getCode();
        PresentationEventStore presentationEventStore = new PresentationEventStore();
		if (inMemoryPresentationEventStoreRepository.add(shortcode, presentationEventStore)) {
			return Optional.of(new CreateSessionResponseDto(shortcode));
		}
		return Optional.empty();
	}

	public Optional<SnapshotResponseDto> getSnapshot(String link) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return Optional.empty();
		}
		Snapshot snapshot = eventStore.get().snapshot();
		SnapshotResponseDto snapshotResponseDto = new SnapshotResponseDto();
		snapshotResponseDto.setSessionPolls(snapshot.getSessionPolls());
		return Optional.of(snapshotResponseDto);
	}

	public Optional<PollCreatedResponseDto> createPoll(String link, CreatePollRequestDto dto) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return Optional.empty();
		}
        Optional<Poll> pollOptional = pollService.getById(dto.getId());
        if (pollOptional.isEmpty()) {
            return Optional.empty();
        }
        pollOptional.get().supplyEvent(eventStore.get());
        List<SessionPoll> sessionPolls = eventStore.get().snapshot().getSessionPolls();
		SessionPoll last = sessionPolls.get(sessionPolls.size() - 1);
		PollCreatedResponseDto pollCreatedResponseDto = PollMapper.INSTANCE.sessionPollToPollCreatedDtoMapper(last);
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

}
