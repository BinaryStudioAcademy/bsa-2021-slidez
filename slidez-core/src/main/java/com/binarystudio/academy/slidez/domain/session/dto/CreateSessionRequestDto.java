package com.binarystudio.academy.slidez.domain.session.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateSessionRequestDto {

	private UUID presentationId;

}
