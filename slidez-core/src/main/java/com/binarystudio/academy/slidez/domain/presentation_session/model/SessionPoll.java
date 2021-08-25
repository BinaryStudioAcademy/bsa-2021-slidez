package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionPoll extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private Boolean isTemplate;

	private List<SessionPollOption> options = new ArrayList<>();

	private List<SessionPollAnswer> answers = new ArrayList<>();

	public SessionPoll(UUID id, String title) {
		this.title = title;
		super.setId(id);
	}

	public void addAnswer(SessionPollAnswer pollAnswer) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(pollAnswer.getOptionId(), option.getId())).findFirst()
				.orElseThrow(() -> new BadOptionException(
						String.format("Option with ID %s not found", pollAnswer.getOptionId())));
		answers.add(pollAnswer);
	}

}
