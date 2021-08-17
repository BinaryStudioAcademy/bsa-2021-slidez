package com.binarystudio.academy.slidez.domain.session.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class SessionNotFoundException extends DomainException {

	public SessionNotFoundException(String message) {
		super(message);
	}

}
