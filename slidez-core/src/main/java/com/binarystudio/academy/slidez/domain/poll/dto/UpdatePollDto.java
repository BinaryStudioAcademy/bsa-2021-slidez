package com.binarystudio.academy.slidez.domain.poll.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePollDto {

	private UUID id;

	private String title;

	private List<PollOptionDto> options;

}
