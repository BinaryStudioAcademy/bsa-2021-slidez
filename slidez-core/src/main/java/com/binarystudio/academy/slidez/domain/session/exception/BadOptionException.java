package com.binarystudio.academy.slidez.domain.session.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class BadOptionException extends DomainException {

	public BadOptionException(String message) {
		super(message);
	}

}
