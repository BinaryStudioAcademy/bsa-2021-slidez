package com.binarystudio.academy.slidez.domain.interactive_element.mapper;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.qasession.mapper.QASessionMapper;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import com.binarystudio.academy.slidez.domain.quiz.mapper.QuizMapper;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
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
		if (element instanceof Poll) {
			return PollMapper.INSTANCE.pollToPollDto((Poll) element);
		}
		else if (element instanceof Quiz) {
			return QuizMapper.INSTANCE.quizToQuizDto((Quiz) element);
		}
        else if (element instanceof QASession) {
            return QASessionMapper.INSTANCE.qaSessionToDto((QASession) element);
        }
		throw new IllegalElementTypeException(
				String.format("Invalid type of element: %s", element.getClass().getName()));
	}

}
