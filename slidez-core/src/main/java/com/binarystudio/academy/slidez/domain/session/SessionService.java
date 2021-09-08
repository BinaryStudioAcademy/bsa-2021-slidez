package com.binarystudio.academy.slidez.domain.session;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.link.LinkService;
import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.StartQASessionEvent;
import com.binarystudio.academy.slidez.domain.session.handler.DomainEventHandler;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.model.Session;

import com.binarystudio.academy.slidez.domain.sessionEvent.SessionEventService;
import com.binarystudio.academy.slidez.domain.sessionEvent.model.SessionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

	private final SessionRepository sessionRepository;

	private final SessionEventService sessionEventService;

	private final PresentationService presentationService;

	private final LinkService linkService;

	private final InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository;

	private final DomainEventHandler eventHandler;

	@Autowired
	public SessionService(SessionRepository sessionRepository, SessionEventService sessionEventService,
			PresentationService presentationService, LinkService linkService,
			InMemoryPresentationEventStoreRepository inMemoryPresentationEventStoreRepository,
			DomainEventHandler eventHandler) {
		this.sessionRepository = sessionRepository;
		this.sessionEventService = sessionEventService;
		this.presentationService = presentationService;
		this.linkService = linkService;
		this.inMemoryPresentationEventStoreRepository = inMemoryPresentationEventStoreRepository;
		this.eventHandler = eventHandler;
	}

	public GenericResponse<SessionResponse, SessionResponseCodes> handleEvent(String link, DomainEvent domainEvent) {
		Optional<PresentationEventStore> eventStore = inMemoryPresentationEventStoreRepository.get(link);
		if (eventStore.isEmpty()) {
			List<SessionEvent> sessionEvents = sessionEventService.getSessionEventBySessionId(link);

			if (sessionEvents.isEmpty()) {
				return new GenericResponse<>(null, SessionResponseCodes.NO_SESSION_WITH_SUCH_LINK);
			}
			Optional<PresentationEventStore> loadingEventStore = Optional.of(new PresentationEventStore(link));
			sessionEvents.forEach(event -> loadingEventStore.get().applyEvent(event.getSessionEvent()));
			inMemoryPresentationEventStoreRepository.set(link, loadingEventStore.get());
			return eventHandler.handle(domainEvent, loadingEventStore.get());
		}
		return eventHandler.handle(domainEvent, eventStore.get());
	}

	public Optional<CreateSessionResponseDto> create(CreateSessionRequestDto dto, int leaseDuration)
			throws IncorrectLeaseDurationException {
		Session session = createForPresentation(dto.getPresentationLink(), leaseDuration);
		String shortcode = session.getLink().getCode();
		PresentationEventStore presentationEventStore = new PresentationEventStore(dto.getPresentationLink());
		if (inMemoryPresentationEventStoreRepository.add(shortcode, presentationEventStore)) {
			handleEvent(shortcode, new StartQASessionEvent(shortcode));
			return Optional.of(new CreateSessionResponseDto(shortcode));
		}
		return Optional.empty();
	}

	private Session createForPresentation(String presentationLink, int linkLeaseDuration)
			throws PresentationNotFoundException {
		Optional<Presentation> presentationOptional = presentationService.getByLink(presentationLink);
		if (presentationOptional.isEmpty()) {
			throw new PresentationNotFoundException(
					String.format("Not found presentation with link = %s", presentationLink));
		}
		Session session = new Session(presentationOptional.get());
		Link link = linkService.leaseLink(linkLeaseDuration);
		session.setLink(link);
		return sessionRepository.save(session);
	}

}
