package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;

import java.util.*;

public class State {

	private final List<SessionInteractiveElement> sessionInteractiveElements = new ArrayList<>();

	public List<SessionInteractiveElement> getSessionInteractiveElements() {
		return Collections.unmodifiableList(sessionInteractiveElements);
	}

	public void addInteractiveElement(SessionInteractiveElement sessionInteractiveElement) {
		sessionInteractiveElements.add(sessionInteractiveElement);
	}

	public void addAnswerToThePoll(SessionPollAnswer pollAnswer) throws PollNotFoundException, BadOptionException {
		sessionInteractiveElements.stream()
				.filter(element -> Objects.equals(element.getClass(), SessionPoll.class)
						&& Objects.equals(element.getId(), pollAnswer.getPollId()))
				.map(element -> (SessionPoll) element).findFirst().orElseThrow(() -> new PollNotFoundException(
						String.format("Poll with id %s not found", pollAnswer.getPollId())))
				.addAnswer(pollAnswer);
	}

}
