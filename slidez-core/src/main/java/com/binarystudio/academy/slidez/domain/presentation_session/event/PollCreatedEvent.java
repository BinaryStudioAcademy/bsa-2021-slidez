package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.presentation_session.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PollCreatedEvent extends DomainEvent {

	private final Poll poll;

	@Override
	public void applyEvent(State state) {
		state.addPoll(poll);
	}

}
