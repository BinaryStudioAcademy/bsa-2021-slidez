package com.binarystudio.academy.slidez.domain.presentationsession.model;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PollOption {
    private UUID id;
    private String name;
    private Poll poll;
}
