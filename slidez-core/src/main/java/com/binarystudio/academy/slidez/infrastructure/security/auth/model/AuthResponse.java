package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import lombok.Data;

@Data
public class AuthResponse {
	private String accessToken;
	private UserDto userDto;

	public static AuthResponse of(String accessToken, UserDto userDto) {
		AuthResponse response = new AuthResponse();
		response.setAccessToken(accessToken);
		response.setUserDto(userDto);
		return response;
	}
}
