package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SessionPollOption {

	private UUID id;

	private String name;

	private Poll poll;

}
