package com.binarystudio.academy.slidez.domain.auth.jwtauth;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import lombok.Getter;

@Getter
public class JwtException extends DomainException {

	private final String code;

	public JwtException(String message, String code) {
		super(message);
		this.code = code;
	}

}
