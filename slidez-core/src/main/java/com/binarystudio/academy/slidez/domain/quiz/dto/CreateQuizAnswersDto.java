package com.binarystudio.academy.slidez.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuizAnswersDto {

	private String title;

	private Boolean isCorrect;

}
