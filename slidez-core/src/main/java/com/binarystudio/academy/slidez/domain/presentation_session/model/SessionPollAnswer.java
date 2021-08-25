package com.binarystudio.academy.slidez.domain.presentation_session.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionPollAnswer {

	private UUID pollID;

	private UUID optionId;

}
