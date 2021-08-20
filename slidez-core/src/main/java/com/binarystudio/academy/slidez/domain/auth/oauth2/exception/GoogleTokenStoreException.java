package com.binarystudio.academy.slidez.domain.auth.oauth2.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class GoogleTokenStoreException extends DomainException {

	public GoogleTokenStoreException(String message, Throwable cause) {
		super(message, cause);
	}

}
