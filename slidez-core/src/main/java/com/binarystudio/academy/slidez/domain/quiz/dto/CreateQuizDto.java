package com.binarystudio.academy.slidez.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuizDto {

	private String presentationLink;

	private String presentationName;

	private String slideId;

	private String title;

	private Boolean isTemplate = Boolean.FALSE;

	private Boolean isMulti = Boolean.FALSE;

	private List<CreateQuizAnswersDto> answers;

}
