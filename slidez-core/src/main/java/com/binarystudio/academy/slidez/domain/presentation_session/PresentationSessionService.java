package com.binarystudio.academy.slidez.domain.presentation_session;

import com.binarystudio.academy.slidez.app.presentationsession.PresentationSessionResponseCodes;
import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.handler.*;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PresentationSessionService {

	private final InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository;

	private final SessionService sessionService;

	private final DomainEventHandler eventHandler;

	@Autowired
	public PresentationSessionService(InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository,
			SessionService sessionService, SnapshotRequestHandler snapshotRequestHandler,
			DefaultEventHandler defaultEventHandler, CreatePollHandler createPollHandler) {
		this.inMemoryPresentationEventStoreRepository = inMemoryPresentationEventStoreRepository;
		this.sessionService = sessionService;
		this.eventHandler = snapshotRequestHandler.setNext(createPollHandler).setNext(defaultEventHandler);
	}

	public GenericResponse<Object, PresentationSessionResponseCodes> handleEvent(String link, DomainEvent domainEvent) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			return new GenericResponse<>(null, PresentationSessionResponseCodes.NO_SESSION_WITH_SUCH_LINK);
		}
		return eventHandler.handle(domainEvent, eventStore.get());
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

}
