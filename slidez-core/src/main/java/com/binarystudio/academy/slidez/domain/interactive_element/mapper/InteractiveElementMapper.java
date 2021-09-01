package com.binarystudio.academy.slidez.domain.interactive_element.mapper;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.qasession.mapper.QASessionMapper;
import com.binarystudio.academy.slidez.domain.quiz.mapper.QuizMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.function.Function;
import java.util.function.Supplier;

@Mapper
public interface InteractiveElementMapper {

	InteractiveElementMapper INSTANCE = Mappers.getMapper(InteractiveElementMapper.class);

	/**
	 * Method returns dto that corresponds to element's type
	 */
	default InteractiveElementDto interactiveElementToTypeRelatedDto(final InteractiveElement element)
			throws IllegalElementTypeException, IllegalStateException {
		switch (element.getType()) {
		case POLL:
			return mapToDto(element::getPoll, PollMapper.INSTANCE::pollToPollDto);
		case QUIZ:
			return mapToDto(element::getQuiz, QuizMapper.INSTANCE::quizToQuizDto);
		case QASession:
			return mapToDto(element::getQaSession, QASessionMapper.INSTANCE::qaSessionToDto);
		default:
			throw new IllegalElementTypeException(String.format("Invalid type of element: %s", element.getType()));
		}
	}

	private static <T, R> R mapToDto(Supplier<T> entitySupplier, Function<T, R> mapper) throws IllegalStateException {
		T entity = entitySupplier.get();
		if (entity == null) {
			throw new IllegalStateException("Entity should not be null!");
		}
		return mapper.apply(entity);
	}

}
