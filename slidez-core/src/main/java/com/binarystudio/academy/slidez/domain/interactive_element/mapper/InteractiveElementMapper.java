package com.binarystudio.academy.slidez.domain.interactive_element.mapper;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.qasession.mapper.QASessionMapper;
import com.binarystudio.academy.slidez.domain.quiz.mapper.QuizMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InteractiveElementMapper {

	InteractiveElementMapper INSTANCE = Mappers.getMapper(InteractiveElementMapper.class);

	/**
	 * Method returns dto that corresponds to element's actual type
	 */
	default InteractiveElementDto interactiveElementToTypeRelatedDto(InteractiveElement element)
			throws IllegalElementTypeException {
		switch (element.getType()) {
		case POLL:
			return PollMapper.INSTANCE.pollToPollDto(element.getPoll());
		case QUIZ:
			return QuizMapper.INSTANCE.quizToQuizDto(element.getQuiz());
		case QASession:
			return QASessionMapper.INSTANCE.qaSessionToDto(element.getQaSession());
		default:
			throw new IllegalElementTypeException(
					String.format("Invalid type of element: %s", element.getClass().getName()));

		}
	}

}
