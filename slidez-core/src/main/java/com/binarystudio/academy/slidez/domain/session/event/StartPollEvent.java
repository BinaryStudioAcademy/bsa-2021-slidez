package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class StartPollEvent extends DomainEvent {

	private String slideId;

	private SessionPoll sessionPoll;

	@Override
	public void applyEvent(State state) throws DomainException {
		SessionPoll pollFromState = state.assertInteractiveElementAdded(sessionPoll);
		this.sessionPoll = pollFromState;
		state.setCurrentInteractiveElement(pollFromState);
	}

}
