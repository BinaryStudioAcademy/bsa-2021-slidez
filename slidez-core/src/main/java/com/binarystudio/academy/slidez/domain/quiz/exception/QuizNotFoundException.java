package com.binarystudio.academy.slidez.domain.quiz.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class QuizNotFoundException extends DomainException {

	public QuizNotFoundException(String message) {
		super(message);
	}

}
