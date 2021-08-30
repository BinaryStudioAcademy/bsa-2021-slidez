package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.quiz.exception.QuizNotFoundException;
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

	public void addAnswerToTheQuiz(SessionQuizAnswer quizAnswer) throws QuizNotFoundException, BadOptionException {
		sessionInteractiveElements.stream()
				.filter(element -> Objects.equals(element.getClass(), SessionQuiz.class)
						&& Objects.equals(element.getId(), quizAnswer.getQuizId()))
				.map(element -> (SessionQuiz) element).findFirst().orElseThrow(() -> new QuizNotFoundException(
						String.format("Quiz with id %s not found", quizAnswer.getQuizId())))
				.addAnswer(quizAnswer);
	}

}
