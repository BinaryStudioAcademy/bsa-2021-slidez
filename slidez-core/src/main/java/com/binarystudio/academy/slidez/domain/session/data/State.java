package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.qasession.exception.QASessionNotFoundException;
import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;

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

	public void addQuestionToQASession(SessionQAQuestion sessionQAQuestion) {
		sessionInteractiveElements.stream()
				.filter(element -> Objects.equals(element.getClass(), SessionQASession.class)
						&& Objects.equals(element.getId(), sessionQAQuestion.getQaSessionId()))
				.map(element -> (SessionQASession) element).findFirst()
				.orElseThrow(() -> new QASessionNotFoundException(
						String.format("QASession with id %s not found", sessionQAQuestion.getQaSessionId())))
				.addQuestion(sessionQAQuestion);
	}

}
