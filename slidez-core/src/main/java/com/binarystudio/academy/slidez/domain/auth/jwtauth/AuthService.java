package com.binarystudio.academy.slidez.domain.auth.jwtauth;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.*;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.auth.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final UserService userService;

	private final JwtProvider jwtProvider;

	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(UserService userService, JwtProvider jwtProvider, PasswordEncoder passwordEncoder) {
		this.userService = userService;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
	}

	public Optional<AuthResponse> performLoginByToken(AuthorizationByTokenRequest authorizationByTokenRequest) {
		Optional<String> email = jwtProvider.getLoginFromToken(authorizationByTokenRequest.getToken());
		if (email.isEmpty()) {
			return Optional.empty();
		}
		Optional<User> userOptional = userService.getByEmail(email.get());
		return userOptional.map(user -> AuthUtil.createAuthResponseFromUser(user, jwtProvider));
	}

	public Optional<RefreshTokensResponse> getRefreshedTokens(RefreshTokensRequest refreshTokensRequest) {
		Optional<String> email = jwtProvider.getLoginFromToken(refreshTokensRequest.getRefreshToken());
		if (email.isEmpty()) {
			return Optional.empty();
		}
		Optional<User> userOptional = userService.getByEmail(email.get());
		return userOptional.map(user -> {
			String accessToken = jwtProvider.generateAccessToken(user);
			String refreshToken = jwtProvider.generateRefreshToken(user);
			return new RefreshTokensResponse(accessToken, refreshToken);
		});
	}

	public Optional<AuthResponse> performLogin(AuthorizationRequest authorizationRequest) {
		Optional<User> userOptional = userService.getByEmail(authorizationRequest.getEmail());
		if (userOptional.isEmpty()) {
			return Optional.empty();
		}

		User user = userOptional.get();

		if (!passwordsMatch(authorizationRequest.getPassword(), user.getPassword())) {
			return Optional.empty();
		}
		return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
	}

	private boolean passwordsMatch(String rawPw, String encodedPw) {
		return this.passwordEncoder.matches(rawPw, encodedPw);
	}

	public Optional<AuthResponse> register(AuthorizationRequest registrationRequest) {
		Optional<AuthResponse> out = Optional.empty();
		if (userService.isEmailPresent(registrationRequest.getEmail())) {
			return out;
		}
		User user = userService.create(registrationRequest.getEmail(), registrationRequest.getPassword());
		return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
	}

}
