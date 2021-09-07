package com.binarystudio.academy.slidez.domain.session.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class SessionQASession extends SessionInteractiveElement {

	private String title;

	private List<SessionQAQuestion> questions = new ArrayList<>();

	public void addQuestion(SessionQAQuestion sessionQAQuestion) {
		questions.add(sessionQAQuestion);
	}

	public void addLikeToQuestion(SessionQAQuestionLike questionLike) {
		Optional<SessionQAQuestion> questionOptional = questions.stream()
				.filter(q -> Objects.equals(q.getId(), questionLike.getQuestionId())).findAny();
		if (questionOptional.isPresent()) {
			SessionQAQuestion question = questionOptional.get();
			boolean isRemoved = question.getLikedBy().remove(questionLike.getParticipantId());
			if (!isRemoved) {
				question.getLikedBy().add(questionLike.getParticipantId());
			}
		}
	}

	public void setVisibilityToQuestion(SessionQAQuestionVisibility visibility) {
		Optional<SessionQAQuestion> questionOptional = questions.stream()
				.filter(q -> Objects.equals(q.getId(), visibility.getQuestionId())).findAny();
		if (questionOptional.isPresent()) {
			SessionQAQuestion question = questionOptional.get();
			question.setIsVisible(visibility.getIsVisible());
		}
	}

}
