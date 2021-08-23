package com.binarystudio.academy.slidez.domain.presentation_session.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateSessionRequestDto {

	private UUID presentationId;

}
