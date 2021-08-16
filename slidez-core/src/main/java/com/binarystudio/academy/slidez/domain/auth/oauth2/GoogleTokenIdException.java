package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class GoogleTokenIdException extends DomainException {

	public GoogleTokenIdException(String message) {
		super(message);
	}

	public GoogleTokenIdException(Throwable cause) {
		super(cause);
	}

}
