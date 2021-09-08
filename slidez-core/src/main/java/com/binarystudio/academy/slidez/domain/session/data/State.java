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

	@SuppressWarnings("unchecked")
	public <T extends SessionInteractiveElement> T assertInteractiveElementAdded(final T element) {
		Optional<? extends SessionInteractiveElement> outHolder = getInteractiveElement(element.getId(),
				element.getClass());
		if (outHolder.isEmpty()) {
			sessionInteractiveElements.add(element);
			return element;
		}
		return (T) outHolder.get();
	}

	public boolean addAnswerToThePoll(SessionPollAnswer pollAnswer) throws PollNotFoundException, BadOptionException {
		SessionPoll poll = getInteractiveElement(pollAnswer.getPollId(), SessionPoll.class).orElseThrow(
				() -> new PollNotFoundException(String.format("Poll with id %s not found", pollAnswer.getPollId())));
		boolean addedToPoll = poll.addAnswer(pollAnswer);
		if (canInteractWithCurrentInteractiveElement(pollAnswer.getPollId(), SessionPoll.class)) {
			SessionPoll sessionPoll = (SessionPoll) this.currentInteractiveElement;
			sessionPoll.addAnswer(pollAnswer);
		}
		return addedToPoll;
	}

	public boolean addAnswerToTheQuiz(SessionQuizAnswer quizAnswer) throws QuizNotFoundException, BadOptionException {
		SessionQuiz sessionQuiz = getInteractiveElement(quizAnswer.getQuizId(), SessionQuiz.class).orElseThrow(
				() -> new QuizNotFoundException(String.format("Quiz with id %s not found", quizAnswer.getQuizId())));
		boolean addedToQuiz = sessionQuiz.addAnswer(quizAnswer);
		if (canInteractWithCurrentInteractiveElement(quizAnswer.getQuizId(), SessionQuiz.class)) {
			SessionQuiz sessionPoll = (SessionQuiz) this.currentInteractiveElement;
			sessionPoll.addAnswer(quizAnswer);
		}
		return addedToQuiz;
	}

	@SuppressWarnings("unchecked")
	private <T extends SessionInteractiveElement> Optional<T> getInteractiveElement(UUID id, Class<T> expectedClass) {
		return sessionInteractiveElements.stream().filter(
				element -> Objects.equals(element.getClass(), expectedClass) && Objects.equals(element.getId(), id))
				.map(element -> (T) element).findFirst();
	}

	public void setVisibilityToQuestionInQASession(SessionQAQuestionVisibility visibility) {
		if (currentQASession != null) {
			currentQASession.setVisibilityToQuestion(visibility);
		}
	}

	public void addQuestionToQASession(SessionQAQuestion sessionQAQuestion) {
		if (currentQASession != null) {
			currentQASession.addQuestion(sessionQAQuestion);
		}
	}

	public void addLikeToQuestionInQASession(SessionQAQuestionLike questionLike) {
		if (currentQASession != null) {
			currentQASession.addLikeToQuestion(questionLike);
		}
	}

	private boolean canInteractWithCurrentInteractiveElement(UUID expectedId, Class<?> expectedClass) {
		return currentInteractiveElement != null && Objects.equals(expectedId, currentInteractiveElement.getId())
				&& Objects.equals(expectedClass, currentInteractiveElement.getClass());
	}

}
