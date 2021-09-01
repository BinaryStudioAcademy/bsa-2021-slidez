package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionPoll extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private List<SessionPollOption> options = new ArrayList<>();

	private List<SessionPollAnswer> answers = new ArrayList<>();

	public void addAnswer(SessionPollAnswer pollAnswer) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(pollAnswer.getOptionId(), option.getId())).findFirst()
				.orElseThrow(() -> new BadOptionException(
						String.format("Option with ID %s not found", pollAnswer.getOptionId())));
		answers.add(pollAnswer);
	}

}
