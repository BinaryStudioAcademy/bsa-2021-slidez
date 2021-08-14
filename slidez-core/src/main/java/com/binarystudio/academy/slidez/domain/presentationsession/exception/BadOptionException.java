package com.binarystudio.academy.slidez.domain.presentationsession.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class BadOptionException extends DomainException {

	public BadOptionException() {
		super();
	}

	public BadOptionException(String message) {
		super(message);
	}

}
