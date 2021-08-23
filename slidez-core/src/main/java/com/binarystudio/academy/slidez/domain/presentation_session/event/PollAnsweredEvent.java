package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class PollAnsweredEvent extends DomainEvent {

	private final UUID pollId;

	private final UUID pollOption;

	@Override
	public void applyEvent(State state) throws PollNotFoundException, BadOptionException {
		state.addAnswerToThePoll(pollId, pollOption);
	}

}
