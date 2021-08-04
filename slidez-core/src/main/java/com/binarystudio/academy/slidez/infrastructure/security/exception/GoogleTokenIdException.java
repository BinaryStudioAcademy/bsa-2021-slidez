package com.binarystudio.academy.slidez.infrastructure.security.exception;

public class GoogleTokenIdException extends RuntimeException {

	public GoogleTokenIdException(String message) {
		super(message);
	}

	public GoogleTokenIdException(Throwable cause) {
		super(cause);
	}

}
