package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationSessionService;
import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class State {

	private PresentationSessionService presentationSessionService;

	@Autowired
	public void setPollService(PresentationSessionService presentationSessionService) {
		this.presentationSessionService = presentationSessionService;
	}

	private final List<Poll> polls = new ArrayList<>();

	public List<Poll> getPolls() {
		return Collections.unmodifiableList(polls);
	}

	public void loadInteraction(UUID pollId) {
		Poll poll = presentationSessionService.getPollFromDbById(pollId);
		if (poll == null) {
			throw new PollNotFoundException(String.format("Poll with id %s not found in the DB", pollId));
		}

		polls.add(poll);
	}

	public void addPoll(Poll poll) {
		polls.add(poll);
	}

	public void addAnswerToThePoll(UUID pollId, UUID answerId) throws PollNotFoundException, BadOptionException {
		polls.stream().filter(poll -> poll.getId().equals(pollId)).findFirst()
				.orElseThrow(() -> new PollNotFoundException(String.format("Poll with id %s not found", pollId)))
				.addAnswer(answerId);
	}

}
