package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollAnsweredDto {

	private UUID pollId;

	private UUID optionId;

}
