package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

	private String accessToken;

	private UserDetailsDto userDetailsDto;

	public static AuthResponse of(String accessToken, UserDetailsDto userDetailsDto) {
		return new AuthResponse(accessToken, userDetailsDto);
	}

}
