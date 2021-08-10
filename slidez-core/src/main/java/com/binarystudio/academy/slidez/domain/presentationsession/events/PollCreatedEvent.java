package com.binarystudio.academy.slidez.domain.presentationsession.events;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class PollCreatedEvent extends DomainEvent {

	private final String pollName;

	private final List<String> pollOptions;

	@Override
	public void applyEvent(State state) {
		state.addPoll(new Poll(pollName, pollOptions));
	}

}
