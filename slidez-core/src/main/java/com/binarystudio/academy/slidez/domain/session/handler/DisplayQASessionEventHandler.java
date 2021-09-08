package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DisplayQASessionEvent;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class DisplayQASessionEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), DisplayQASessionEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		super.handle(domainEvent, presentationEventStore);
		DisplayQASessionEvent event = (DisplayQASessionEvent) domainEvent;
		SessionQASession currentQASession = event.getCurrentQASession();
		ResponseType type = (currentQASession == null) ? ResponseType.NOT_FOUND_QA_SESSION
				: ResponseType.DISPLAYED_QA_SESSION;
		final SessionResponse sessionResponse = new SessionResponse(type, currentQASession);
		return new GenericResponse<>(sessionResponse);
	}

}
