package com.binarystudio.academy.slidez.domain.auth.oauth2;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthResponse;
import com.binarystudio.academy.slidez.domain.auth.util.AuthUtil;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.JwtProvider;
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

	public Optional<AuthResponse> loginWithGoogle(String idToken) throws GoogleTokenIdException {
		Optional<String> emailForGoogle = getEmailForGoogle(idToken);
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		Optional<User> byEmail = userService.getByEmail(email);
		return byEmail.map(user -> AuthUtil.createAuthResponseFromUser(user, jwtProvider));
	}

	public Optional<AuthResponse> registerWithGoogle(String idToken) throws GoogleTokenIdException {
		Optional<String> emailForGoogle = getEmailForGoogle(idToken);
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		if (!userService.isEmailPresent(email)) {
			User user = userService.createByEmail(email);
			return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
		}
		return Optional.empty();
	}

	private Optional<String> getEmailForGoogle(String idToken) throws GoogleTokenIdException {
		GoogleIdToken.Payload verify = this.googleTokenVerifier.verify(idToken);
		return Optional.of(verify.getEmail());
	}

}
