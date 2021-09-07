package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.event.AnswerPollEvent;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AnswerPollHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), AnswerPollEvent.class)) {
			super.handle(domainEvent, presentationEventStore);
			AnswerPollEvent event = (AnswerPollEvent) domainEvent;
			if (event.isAddedSuccessfully()) {
				SessionResponse out = new SessionResponse(ResponseType.ANSWERED_POLL, event.getPollAnswer());
				return new GenericResponse<>(out);
			}
			return super.handle(domainEvent, presentationEventStore);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
