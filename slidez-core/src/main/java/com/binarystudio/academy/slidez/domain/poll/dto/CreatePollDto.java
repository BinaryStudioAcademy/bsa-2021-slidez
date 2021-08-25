package com.binarystudio.academy.slidez.domain.poll.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePollDto {

	private UUID presentationId;

	private String slideId;

	private String title;

	private Boolean isTemplate = Boolean.FALSE;

	private Boolean isMulti = Boolean.FALSE;

	private List<CreatePollOptionDto> options;

}
