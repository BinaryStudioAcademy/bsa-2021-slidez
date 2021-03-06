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

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "interactiveElement.type", target = "type"),
			@Mapping(source = "interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "title", target = "title"), @Mapping(source = "isMulti", target = "isMulti"),
			@Mapping(source = "isTemplate", target = "isTemplate"), @Mapping(source = "owner.id", target = "ownerId"),
			@Mapping(target = "quizAnswers", expression = "java( quizAnswersToDtos(quiz.getAnswers()) )") })
	QuizDto quizToQuizDto(Quiz quiz);

}
