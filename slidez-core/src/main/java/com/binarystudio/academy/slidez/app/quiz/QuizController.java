package com.binarystudio.academy.slidez.app.quiz;

import com.binarystudio.academy.slidez.domain.quiz.QuizService;
import com.binarystudio.academy.slidez.domain.quiz.dto.CreateQuizDto;
import com.binarystudio.academy.slidez.domain.quiz.dto.QuizDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("${v1API}/quizzes")
public class QuizController {

	private final QuizService quizService;

	@Autowired
	public QuizController(QuizService quizService) {
		this.quizService = quizService;
	}

	@PostMapping("/new")
	public GenericResponse<QuizDto, QuizResponseCodes> create(@RequestBody CreateQuizDto dto, Principal principal) {
		UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) authenticationToken.getPrincipal();
		QuizDto quizDto = quizService.create(dto, user);
		return new GenericResponse<>(quizDto);
	}

}
