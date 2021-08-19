package com.binarystudio.academy.slidez.domain.presentationsession.event;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class PollCreatedEvent extends DomainEvent {

	private final String pollName;

    private final UUID pollID;

	@Override
	public void applyEvent(State state) {
		state.addPoll(new Poll(pollID, pollName));
	}

}
