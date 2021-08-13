package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.Data;

import java.util.List;

@Data
public class CreatePollRequestDto {

	private String name;

	private List<String> options;

}
