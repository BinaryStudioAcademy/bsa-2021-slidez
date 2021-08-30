package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionPollAnswer;
import com.binarystudio.academy.slidez.domain.session.data.State;
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
