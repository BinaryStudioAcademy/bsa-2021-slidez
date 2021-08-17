package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PollCreatedResponseDto {

	private String name;

	private List<String> options;

	private UUID id;

	private List<Integer> answers;

}
