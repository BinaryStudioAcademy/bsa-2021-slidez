package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class State {

	private final List<SessionPoll> sessionPolls = new ArrayList<>();

	public List<SessionPoll> getPolls() {
		return Collections.unmodifiableList(sessionPolls);
	}

	public void addPoll(SessionPoll sessionPoll) {
		sessionPolls.add(sessionPoll);
	}

	public void addAnswerToThePoll(UUID pollId, UUID answerId) throws PollNotFoundException, BadOptionException {
		sessionPolls.stream().filter(poll -> poll.getId().equals(pollId)).findFirst()
				.orElseThrow(() -> new PollNotFoundException(String.format("Poll with id %s not found", pollId)))
				.addAnswer(answerId);
	}

}
