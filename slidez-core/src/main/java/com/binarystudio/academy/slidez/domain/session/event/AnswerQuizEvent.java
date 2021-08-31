package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuizAnswer;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AnswerQuizEvent extends DomainEvent {

	private SessionQuizAnswer quizAnswer;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addAnswerToTheQuiz(quizAnswer);
	}

}
