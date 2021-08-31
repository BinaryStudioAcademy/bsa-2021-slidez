package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionQuiz extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private List<SessionQuizOption> options;

	private List<SessionQuizAnswer> answers;

	public void addAnswer(SessionQuizAnswer answer) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(answer.getAnswerId(), option.getId())).findFirst().orElseThrow(
				() -> new BadOptionException(String.format("Option with ID %s not found", answer.getAnswerId())));
		answers.add(answer);
	}

}
