package com.binarystudio.academy.slidez.infrastructure.security.auth;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationByTokenRequest;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import com.binarystudio.academy.slidez.infrastructure.security.util.AuthUtil;
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
		Optional<User> userByToken = this.userService.getByToken(authorizationByTokenRequest.getToken());
		return userByToken.map(user -> AuthUtil.createResponseFromUser(user, jwtProvider));
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
		return Optional.of(AuthUtil.createResponseFromUser(user, jwtProvider));
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
		return Optional.of(AuthUtil.createResponseFromUser(user, jwtProvider));
	}

}
