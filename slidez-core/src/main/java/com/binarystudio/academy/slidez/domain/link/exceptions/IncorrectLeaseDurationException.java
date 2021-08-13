package com.binarystudio.academy.slidez.domain.link.exceptions;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class IncorrectLeaseDurationException extends DomainException {

	public IncorrectLeaseDurationException(String message) {
		super(message);
	}

}
