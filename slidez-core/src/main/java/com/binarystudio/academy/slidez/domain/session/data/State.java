package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.quiz.exception.QuizNotFoundException;
import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

public class State {

	@Getter
	@Setter
	private SessionInteractiveElement currentInteractiveElement;

	@Getter
	@Setter
	private SessionQASession currentQASession;

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
		if (canInteractWithCurrentInteractiveElement(pollAnswer.getPollId(), SessionPoll.class)) {
			SessionPoll sessionPoll = (SessionPoll) this.currentInteractiveElement;
			sessionPoll.addAnswer(pollAnswer);
		}
	}

	public void addAnswerToTheQuiz(SessionQuizAnswer quizAnswer) throws QuizNotFoundException, BadOptionException {
		sessionInteractiveElements.stream()
				.filter(element -> Objects.equals(element.getClass(), SessionQuiz.class)
						&& Objects.equals(element.getId(), quizAnswer.getQuizId()))
				.map(element -> (SessionQuiz) element).findFirst().orElseThrow(() -> new QuizNotFoundException(
						String.format("Quiz with id %s not found", quizAnswer.getQuizId())))
				.addAnswer(quizAnswer);
		if (canInteractWithCurrentInteractiveElement(quizAnswer.getQuizId(), SessionQuiz.class)) {
			SessionQuiz sessionPoll = (SessionQuiz) this.currentInteractiveElement;
			sessionPoll.addAnswer(quizAnswer);
		}
	}

	public void addQuestionToQASession(SessionQAQuestion sessionQAQuestion) {
		if (currentQASession != null) {
			currentQASession.addQuestion(sessionQAQuestion);
		}
	}

	private boolean canInteractWithCurrentInteractiveElement(UUID expectedId, Class<?> expectedClass) {
		return currentInteractiveElement != null && Objects.equals(expectedId, currentInteractiveElement.getId())
				&& Objects.equals(expectedClass, currentInteractiveElement.getClass());
	}

}
