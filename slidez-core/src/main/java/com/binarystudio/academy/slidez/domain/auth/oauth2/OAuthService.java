package com.binarystudio.academy.slidez.domain.auth.oauth2;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthResponse;
import com.binarystudio.academy.slidez.domain.auth.oauth2.exception.GoogleTokenIdException;
import com.binarystudio.academy.slidez.domain.auth.oauth2.exception.GoogleTokenRequestException;
import com.binarystudio.academy.slidez.domain.auth.oauth2.exception.GoogleTokenStoreException;
import com.binarystudio.academy.slidez.domain.auth.oauth2.validation.GoogleTokenVerifier;
import com.binarystudio.academy.slidez.domain.auth.util.AuthUtil;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.JwtProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {

	private final GoogleTokenVerifier googleTokenVerifier;

	private final GoogleOauthTokenFetcher googleOauthTokenFetcher;

	private final UserService userService;

	private final JwtProvider jwtProvider;

	@Autowired
	public OAuthService(GoogleTokenVerifier googleTokenVerifier, GoogleOauthTokenFetcher googleOauthTokenFetcher,
			UserService userService, JwtProvider jwtProvider) {
		this.googleTokenVerifier = googleTokenVerifier;
		this.googleOauthTokenFetcher = googleOauthTokenFetcher;
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	public Optional<AuthResponse> loginWithGoogle(String code)
			throws GoogleTokenIdException, GoogleTokenRequestException, GoogleTokenStoreException {
		GoogleTokenResponse response = googleOauthTokenFetcher.getGoogleTokenResponse(code);
		Optional<String> emailForGoogle = getEmailForGoogle(response.getIdToken());
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		Optional<User> byEmail = userService.getByEmail(email);
		if (byEmail.isPresent()) {
			User user = byEmail.get();
			googleOauthTokenFetcher.createAndStoreCredential(response, user.getId());
			return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
		}
		return Optional.empty();
	}

	public Optional<AuthResponse> registerWithGoogle(String code)
			throws GoogleTokenIdException, GoogleTokenRequestException, GoogleTokenStoreException {
		GoogleTokenResponse response = googleOauthTokenFetcher.getGoogleTokenResponse(code);
		Optional<String> emailForGoogle = getEmailForGoogle(response.getIdToken());
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		String email = emailForGoogle.get();
		if (!userService.isEmailPresent(email)) {
			User user = userService.createByEmail(email);
			googleOauthTokenFetcher.createAndStoreCredential(response, user.getId());
			return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
		}
		return Optional.empty();
	}

	private Optional<String> getEmailForGoogle(String idToken) throws GoogleTokenIdException {
		GoogleIdToken.Payload verify = this.googleTokenVerifier.verify(idToken);
		return Optional.of(verify.getEmail());
	}

}
