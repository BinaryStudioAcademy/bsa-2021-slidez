package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.app.presentationsession.PresentationSessionResponseCodes;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.presentation_session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.presentation_session.event.AnswerPollEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AnswerPollHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, PresentationSessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), AnswerPollEvent.class)) {
			super.handle(domainEvent, presentationEventStore);
			AnswerPollEvent event = (AnswerPollEvent) domainEvent;
			SessionResponse out = new SessionResponse(ResponseType.ANSWERED_POLL, event.getPollAnswer());
			return new GenericResponse<>(out);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
