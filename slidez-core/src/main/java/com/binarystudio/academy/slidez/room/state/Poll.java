package com.binarystudio.academy.slidez.room.state;

import com.binarystudio.academy.slidez.room.exceptions.BadOptionException;
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

    public void addAnswer(int optionId) {
        if (optionId < 0 || optionId >= options.size()) {
            throw new BadOptionException(String.format("Option should be in range 0...%d;", options.size()));
        }

        answers.add(optionId);
    }

}
