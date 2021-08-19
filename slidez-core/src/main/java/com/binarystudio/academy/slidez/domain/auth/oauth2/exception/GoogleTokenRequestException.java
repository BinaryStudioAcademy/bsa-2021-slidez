package com.binarystudio.academy.slidez.domain.auth.oauth2.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class GoogleTokenRequestException extends DomainException {

	public GoogleTokenRequestException(String message, Throwable cause) {
		super(message, cause);
	}

}
