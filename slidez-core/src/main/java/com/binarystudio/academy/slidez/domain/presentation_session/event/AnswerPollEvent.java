package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPollAnswer;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AnswerPollEvent extends DomainEvent {

	private SessionPollAnswer pollAnswer;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addAnswerToThePoll(pollAnswer);
	}

}
