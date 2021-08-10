package com.binarystudio.academy.slidez.domain.presentationsession.event;

import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class PollAnsweredEvent extends DomainEvent {

	private final UUID pollId;

	private final int pollOption;

	@Override
	public void applyEvent(State state) {
		state.addAnswerToThePoll(pollId, pollOption);
	}

}
