package com.binarystudio.academy.slidez.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizAnswerDto {

	private UUID id;

	private String title;

	private Boolean isCorrect;

}
