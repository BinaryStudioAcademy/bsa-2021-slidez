package com.binarystudio.academy.slidez.domain.quiz;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.quiz.dto.CreateQuizDto;
import com.binarystudio.academy.slidez.domain.quiz.dto.QuizDto;
import com.binarystudio.academy.slidez.domain.quiz.mapper.QuizMapper;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import com.binarystudio.academy.slidez.domain.quiz.model.QuizAnswer;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

	private final PresentationService presentationService;

	private final QuizRepository quizRepository;

	@Autowired
	public QuizService(PresentationService presentationService, QuizRepository quizRepository) {
		this.presentationService = presentationService;
		this.quizRepository = quizRepository;
	}

	public QuizDto create(CreateQuizDto dto, User owner) {
		Presentation presentation = presentationService.assertPresentationExists(dto.getPresentationLink(), owner);
		InteractiveElement interactiveElement = new InteractiveElement();
		interactiveElement.setType(InteractiveElementType.QUIZ);
		interactiveElement.setPresentation(presentation);
		interactiveElement.setSlideId(dto.getSlideId());

		Quiz quiz = new Quiz();
		List<QuizAnswer> answers = dto.getAnswers().stream()
				.map(e -> new QuizAnswer(null, e.getTitle(), e.getIsCorrect())).collect(Collectors.toList());
		quiz.setQuizAnswers(answers);
		quiz.setInteractiveElement(interactiveElement);
		quiz.setOwner(owner);
		quiz.setIsMulti(dto.getIsMulti());
		quiz.setTitle(dto.getTitle());
		quiz.setIsTemplate(dto.getIsTemplate());
		quiz.setPresentation(presentation);
		quiz.setSlideId(dto.getSlideId());

		Quiz saved = quizRepository.save(quiz);
		return QuizMapper.INSTANCE.quizToQuizDto(saved);
	}

}
