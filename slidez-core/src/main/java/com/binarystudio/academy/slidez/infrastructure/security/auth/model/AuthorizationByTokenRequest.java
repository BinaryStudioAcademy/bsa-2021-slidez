package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import lombok.Data;

@Data
public class AuthorizationByTokenRequest {

	private String token;

	private String refreshToken;

}
