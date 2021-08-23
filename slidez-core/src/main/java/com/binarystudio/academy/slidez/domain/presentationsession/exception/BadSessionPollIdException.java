package com.binarystudio.academy.slidez.domain.presentationsession.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class BadSessionPollIdException extends DomainException {

	public BadSessionPollIdException(String message) {
		super(message);
	}

}
