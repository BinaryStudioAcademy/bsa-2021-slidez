package com.binarystudio.academy.slidez.domain.presentationsession.model;

import com.binarystudio.academy.slidez.domain.presentationsession.exception.BadOptionException;
import lombok.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Value
public class Poll {

	UUID id = UUID.randomUUID();

	String name;

	List<String> options;

	List<Integer> answers = new ArrayList<>();

	public void addAnswer(int optionId) throws BadOptionException {
		if (optionId < 0 || optionId >= options.size()) {
			throw new BadOptionException(String.format("Option should be in range 0...%d;", options.size()));
		}

		answers.add(optionId);
	}

}
