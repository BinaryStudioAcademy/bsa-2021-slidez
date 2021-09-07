package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.quiz.QuizService;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuiz;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.StartQuizEvent;
import com.binarystudio.academy.slidez.domain.session.mapper.SessionInteractiveElementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class StartQuizEventHandler extends AbstractDomainEventHandler {

	private final QuizService quizService;

	@Autowired
	public StartQuizEventHandler(QuizService quizService) {
		this.quizService = quizService;
	}

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), StartQuizEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		StartQuizEvent event = (StartQuizEvent) domainEvent;
		Optional<Quiz> bySlideId = quizService.findBySlideId(event.getSlideId());
		if (bySlideId.isEmpty()) {
			return new GenericResponse<>(null, SessionResponseCodes.COULD_NOT_START_QUIZ);
		}
		Quiz quiz = bySlideId.get();
		SessionInteractiveElementMapper mapper = SessionInteractiveElementMapper.INSTANCE;
		event.setSessionQuiz(mapper.mapQuizToSessionQuiz(quiz));
		super.handle(event, presentationEventStore);
		SessionQuiz outGoingQuiz = event.getSessionQuiz();
		SessionResponse sessionResponse = new SessionResponse(ResponseType.STARTED_QUIZ, outGoingQuiz);
		return new GenericResponse<>(sessionResponse);
	}

}
