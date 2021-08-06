package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {

	private final GoogleTokenVerifier googleTokenVerifier;

	private final UserService userService;

	private final JwtProvider jwtProvider;

	@Autowired
	public OAuthService(GoogleTokenVerifier googleTokenVerifier, UserService userService, JwtProvider jwtProvider) {
		this.googleTokenVerifier = googleTokenVerifier;
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	public Optional<AuthResponse> loginWithGoogle(String idToken) {
		Optional<String> emailForGoogle = getEmailForGoogle(idToken);
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		Optional<User> byEmail = userService.findByEmail(email);
		return byEmail.map(user -> {
			String token = this.jwtProvider.generateAccessToken(user);
			UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
			return AuthResponse.of(token, userDetailsDto);
		});
	}

	public Optional<AuthResponse> registerWithGoogle(String idToken) {
		Optional<String> emailForGoogle = getEmailForGoogle(idToken);
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		if (!userService.isEmailPresent(email)) {
			User byEmail = userService.createByEmail(email);
			String token = this.jwtProvider.generateAccessToken(byEmail);
			UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(byEmail);
			return Optional.of(AuthResponse.of(token, userDetailsDto));
		}
		return Optional.empty();
	}

	private Optional<String> getEmailForGoogle(String idToken) {
		Optional<String> emailHolder = Optional.empty();
		try {
			GoogleIdToken.Payload verify = this.googleTokenVerifier.verify(idToken);
			emailHolder = Optional.of(verify.getEmail());
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
		return emailHolder;
	}

}
