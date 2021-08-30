package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.AskQuestionEvent;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AskQuestionEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), AskQuestionEvent.class)) {
			AskQuestionEvent event = (AskQuestionEvent) domainEvent;
			super.handle(event, presentationEventStore);
			SessionResponse sessionResponse = new SessionResponse(ResponseType.ASKED_QUESTION, event.getQuestion());
			return new GenericResponse<>(sessionResponse);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
