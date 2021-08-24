package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PollCreatedEvent extends DomainEvent {

	private final SessionPoll sessionPoll;

	@Override
	public void applyEvent(State state) {
		state.addPoll(sessionPoll);
	}

}
