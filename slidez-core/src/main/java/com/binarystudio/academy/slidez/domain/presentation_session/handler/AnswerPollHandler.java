package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.app.presentationsession.PresentationSessionResponseCodes;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.AnswerPollEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AnswerPollHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<Object, PresentationSessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), AnswerPollEvent.class)) {
			super.handle(domainEvent, presentationEventStore);
			AnswerPollEvent event = (AnswerPollEvent) domainEvent;
			return new GenericResponse<>(event.getPollAnswer());
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
