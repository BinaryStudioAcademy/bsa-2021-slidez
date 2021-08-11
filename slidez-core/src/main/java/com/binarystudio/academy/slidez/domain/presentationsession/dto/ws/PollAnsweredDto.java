package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PollAnsweredDto extends AbstractWebSocketResponseDto {

	private UUID pollId;

	private int option;

}
