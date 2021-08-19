package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import com.binarystudio.academy.slidez.domain.presentationsession.model.PollOption;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CreatePollRequestDto {

	private String name;

	private UUID id;

}
