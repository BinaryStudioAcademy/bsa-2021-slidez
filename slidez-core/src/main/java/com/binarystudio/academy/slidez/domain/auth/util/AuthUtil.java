package com.binarystudio.academy.slidez.domain.auth.util;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;

public final class AuthUtil {

	private AuthUtil() {
	}

	public static AuthResponse createAuthResponseFromUser(User user, JwtProvider jwtProvider) {
		String accessToken = jwtProvider.generateAccessToken(user);
		String refreshToken = jwtProvider.generateRefreshToken(user);
		UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
		return AuthResponse.of(accessToken, refreshToken, userDetailsDto);
	}

}
