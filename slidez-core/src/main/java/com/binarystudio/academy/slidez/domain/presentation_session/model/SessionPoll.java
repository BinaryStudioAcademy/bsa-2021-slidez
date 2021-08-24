package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.presentation_session.exception.BadOptionException;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Data
public class SessionPoll {

	private UUID id;

	private String name;

	private List<SessionPollOption> options = new ArrayList<>();

	private List<UUID> answers = new ArrayList<>();

	public SessionPoll(UUID id, String name) {
		this.name = name;
		if (id != null) {
			this.id = id;

		}
	}

	public void addAnswer(UUID optionId) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(optionId, option.getId())).findFirst()
				.orElseThrow(() -> new BadOptionException(String.format("Option with ID %s not found", optionId)));
		answers.add(optionId);
	}

}
