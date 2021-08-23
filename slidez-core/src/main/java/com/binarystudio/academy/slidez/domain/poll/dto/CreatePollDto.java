package com.binarystudio.academy.slidez.domain.poll.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePollDto {

	private String presentationId;

	private String title;

	private List<CreatePollOptionDto> options;

}
