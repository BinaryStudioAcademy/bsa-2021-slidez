package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuiz;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class StartQuizEvent extends DomainEvent {

	private String slideId;

	private SessionQuiz sessionQuiz;

	@Override
	public void applyEvent(State state) throws DomainException {
		SessionQuiz savedQuiz = state.assertInteractiveElementAdded(sessionQuiz);
		this.sessionQuiz = savedQuiz;
		state.setCurrentInteractiveElement(savedQuiz);
	}

}
