package com.binarystudio.academy.slidez.domain.presentation_session.dto.ws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerPollResponseDto {

	private UUID pollId;

	private UUID optionId;

}
