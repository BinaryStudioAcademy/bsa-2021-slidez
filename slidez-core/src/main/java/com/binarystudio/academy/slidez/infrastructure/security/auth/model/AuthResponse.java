package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import lombok.Data;

@Data
public class AuthResponse {
	private String accessToken;

	public static AuthResponse of(String accessToken) {
		AuthResponse response = new AuthResponse();
		response.setAccessToken(accessToken);
		return response;
	}
}
