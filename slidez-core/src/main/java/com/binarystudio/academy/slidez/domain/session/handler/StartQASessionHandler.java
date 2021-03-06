package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.qasession.QASessionService;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.StartQASessionEvent;
import com.binarystudio.academy.slidez.domain.session.mapper.SessionInteractiveElementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class StartQASessionHandler extends AbstractDomainEventHandler {

	private final QASessionService qaSessionService;

	@Autowired
	public StartQASessionHandler(QASessionService qaSessionService) {
		this.qaSessionService = qaSessionService;
	}

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), StartQASessionEvent.class)) {
			StartQASessionEvent startQASessionEvent = (StartQASessionEvent) domainEvent;
			Optional<QASession> qaSessionOptional = qaSessionService
					.getBySessionShortLink(startQASessionEvent.getShortCode());
			if (qaSessionOptional.isPresent()) {
				QASession qaSession = qaSessionOptional.get();
				SessionQASession sessionQASession = SessionInteractiveElementMapper.INSTANCE
						.mapQASessionToSessionQASession(qaSession);
				startQASessionEvent.setSessionQASession(sessionQASession);
				super.handle(startQASessionEvent, presentationEventStore);
				SessionQASession outGoingSession = startQASessionEvent.getSessionQASession();
				SessionResponse out = new SessionResponse(ResponseType.STARTED_QA_SESSION, outGoingSession);
				return new GenericResponse<>(out);
			}
			return super.handle(domainEvent, presentationEventStore);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
