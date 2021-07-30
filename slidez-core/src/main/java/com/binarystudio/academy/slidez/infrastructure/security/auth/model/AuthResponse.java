package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import lombok.Data;

@Data
public class AuthResponse {
	private String accessToken;
	private UserDetailsDto userDetailsDto;

	public static AuthResponse of(String accessToken, UserDetailsDto userDetailsDto) {
		AuthResponse response = new AuthResponse();
		response.setAccessToken(accessToken);
		response.setUserDetailsDto(userDetailsDto);
		return response;
	}
}
