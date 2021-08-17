package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.Data;

import java.util.UUID;

@Data
public class AnswerPollDto {

	private UUID pollId;

	private int option;

}
