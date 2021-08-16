package com.binarystudio.academy.slidez.domain.email.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class CouldNotSendEmailException extends DomainException {

	public CouldNotSendEmailException(Throwable throwable) {
		super(throwable);
	}

}
