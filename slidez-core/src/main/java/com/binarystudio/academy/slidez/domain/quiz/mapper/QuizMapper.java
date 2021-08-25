package com.binarystudio.academy.slidez.domain.quiz.mapper;

import com.binarystudio.academy.slidez.domain.quiz.dto.QuizAnswerDto;
import com.binarystudio.academy.slidez.domain.quiz.dto.QuizDto;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import com.binarystudio.academy.slidez.domain.quiz.model.QuizAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface QuizMapper {

	QuizMapper INSTANCE = Mappers.getMapper(QuizMapper.class);

	List<QuizAnswerDto> quizAnswersToDtos(List<QuizAnswer> quizAnswers);

	@Mappings({ @Mapping(source = "quiz.id", target = "id"), @Mapping(source = "quiz.type", target = "type"),
			@Mapping(source = "quiz.slideId", target = "slideId"),
			@Mapping(source = "quiz.ownerId", target = "ownerId"), @Mapping(source = "quiz.title", target = "title"),
			@Mapping(source = "quiz.isMulti", target = "isMulti"),
			@Mapping(source = "quiz.isTemplate", target = "isTemplate"),
			@Mapping(target = "quizAnswers", expression = "java( quizAnswersToDtos(quiz.getQuizAnswers()) )") })
	QuizDto quizToQuizDto(Quiz quiz);

}
