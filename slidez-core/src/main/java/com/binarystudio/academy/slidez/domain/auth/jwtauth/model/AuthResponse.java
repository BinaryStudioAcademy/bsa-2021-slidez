package com.binarystudio.academy.slidez.domain.auth.jwtauth.model;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

	private String accessToken;

	private String refreshToken;

	private UserDetailsDto userDetailsDto;

	public static AuthResponse of(String accessToken, String refreshToken, UserDetailsDto userDetailsDto) {
		return new AuthResponse(accessToken, refreshToken, userDetailsDto);
	}

}
