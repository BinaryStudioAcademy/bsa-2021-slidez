package com.binarystudio.academy.slidez.domain.presentation.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class PresentationNotFoundException extends DomainException {

	public PresentationNotFoundException(String message) {
		super(message);
	}

}
