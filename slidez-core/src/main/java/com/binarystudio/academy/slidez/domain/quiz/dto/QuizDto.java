package com.binarystudio.academy.slidez.domain.quiz.dto;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDto extends InteractiveElementDto {

	private String title;

	private Boolean isMulti;

	private Boolean isTemplate;

	private List<QuizAnswerDto> quizAnswers;

}
