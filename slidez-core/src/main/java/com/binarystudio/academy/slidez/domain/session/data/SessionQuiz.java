package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionQuiz extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private List<SessionQuizOption> options = new ArrayList<>();

	private Collection<SessionQuizAnswer> answers = new HashSet<>();

	@JsonIgnore
	private Map<UUID, SessionQuizAnswer> answeredByToAnswers = new HashMap<>();

	/**
	 * @return true, if answer was added
	 */
	public boolean addAnswer(SessionQuizAnswer answer) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(answer.getAnswerId(), option.getId())).findFirst().orElseThrow(
				() -> new BadOptionException(String.format("Option with ID %s not found", answer.getAnswerId())));
		boolean isAdded = answeredByToAnswers.putIfAbsent(answer.getAnsweredBy(), answer) == null;
		this.answers = answeredByToAnswers.values();
		return isAdded;
	}

}
