package com.binarystudio.academy.slidez.domain.poll.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class PollNotFoundException extends DomainException {

	public PollNotFoundException(String message) {
		super(message);
	}

}
