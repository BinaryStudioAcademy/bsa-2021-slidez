package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionQAQuestionVisibility;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.SetQuestionVisibilityEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class SetQuestionVisibilityEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), SetQuestionVisibilityEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		final SetQuestionVisibilityEvent event = (SetQuestionVisibilityEvent) domainEvent;
		super.handle(domainEvent, presentationEventStore);
		final SessionQAQuestionVisibility visibility = event.getVisibility();
		SessionResponse sessionResponse = new SessionResponse(ResponseType.SET_VISIBILITY_TO_QUESTION, visibility);
		return new GenericResponse<>(sessionResponse);
	}

}
