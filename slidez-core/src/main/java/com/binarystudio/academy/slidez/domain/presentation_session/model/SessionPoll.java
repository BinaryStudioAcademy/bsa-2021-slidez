package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class SessionPoll extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private Boolean isTemplate;

	private List<SessionPollOption> options = new ArrayList<>();

	private List<UUID> answers = new ArrayList<>();

	public SessionPoll(UUID id, String title) {
		this.title = title;
		if (id != null) {
			super.setId(id);
		}
	}

	public void addAnswer(UUID optionId) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(optionId, option.getId())).findFirst()
				.orElseThrow(() -> new BadOptionException(String.format("Option with ID %s not found", optionId)));
		answers.add(optionId);
	}

}
