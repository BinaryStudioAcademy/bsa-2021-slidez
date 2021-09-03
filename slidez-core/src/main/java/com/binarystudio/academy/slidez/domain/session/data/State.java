package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.quiz.exception.QuizNotFoundException;
import com.binarystudio.academy.slidez.domain.qasession.exception.QASessionNotFoundException;
import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

public class State {

	@Getter
	@Setter
	private SessionInteractiveElement currentInteractiveElement;

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
