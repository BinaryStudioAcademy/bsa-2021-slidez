package com.binarystudio.academy.slidez.domain.presentationsession.event;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PollCreatedEvent extends DomainEvent {

	private final Poll poll;

	@Override
	public void applyEvent(State state) {
		state.addPoll(poll);
	}

}
