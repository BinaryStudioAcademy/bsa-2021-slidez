package com.binarystudio.academy.slidez.domain.presentation_session.dto.ws;

import lombok.Data;

import java.util.UUID;

@Data
public class StartPollRequestDto {

	private String name;

	private UUID id;

}
