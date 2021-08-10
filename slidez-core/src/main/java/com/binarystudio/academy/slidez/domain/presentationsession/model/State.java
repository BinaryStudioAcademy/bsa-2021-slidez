package com.binarystudio.academy.slidez.room.state;

import com.binarystudio.academy.slidez.room.exceptions.PollNotFoundException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class State {

	private final List<Poll> polls = new ArrayList<>();

	public List<Poll> getPolls() {
		return Collections.unmodifiableList(polls);
	}

	public void addPoll(Poll poll) {
		polls.add(poll);
	}

	public void addAnswerToThePoll(UUID pollId, int answerId) {
		polls.stream().filter(poll -> poll.getId().equals(pollId)).findFirst()
				.orElseThrow(() -> new PollNotFoundException(String.format("Poll with id %s not found", pollId)))
				.addAnswer(answerId);
	}

}
