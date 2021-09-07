package com.binarystudio.academy.slidez.domain.poll.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePollDto {

	private String presentationId;

	private String presentationName;

	private String slideId;

	private String title;

	private Boolean isTemplate = Boolean.FALSE;

	private Boolean isMulti = Boolean.FALSE;

	private List<CreatePollOptionDto> options;

}
