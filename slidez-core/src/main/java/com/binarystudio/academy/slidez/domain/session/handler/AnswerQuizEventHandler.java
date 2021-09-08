package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuizAnswer;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.AnswerQuizEvent;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AnswerQuizEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), AnswerQuizEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		super.handle(domainEvent, presentationEventStore);
		AnswerQuizEvent event = (AnswerQuizEvent) domainEvent;
		if (event.isAddedSuccessfully()) {
			SessionQuizAnswer quizAnswer = event.getQuizAnswer();
			SessionResponse out = new SessionResponse(ResponseType.ANSWERED_QUIZ, quizAnswer);
			return new GenericResponse<>(out);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
