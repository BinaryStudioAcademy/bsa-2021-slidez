package com.binarystudio.academy.slidez.domain.presentationsession.model;

import com.binarystudio.academy.slidez.domain.presentationsession.exception.BadOptionException;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class Poll {
    private UUID id;

    private String name;

    private List<PollOption> options;

    private List<UUID> answers = new ArrayList<>();

    public Poll(UUID id, String name) {
        this.name = name;
        if (id != null) {
            this.id = id;
        }
    }

	public void addAnswer(UUID optionId) throws BadOptionException {
        options.stream()
            .filter(option -> optionId.equals(option.getId()))
            .findFirst()
            .orElseThrow(() -> new BadOptionException(String.format("Option with ID %s not found", optionId)));
		answers.add(optionId);
	}

}
