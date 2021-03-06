package com.binarystudio.academy.slidez.domain.auth.oauth2;

import java.io.IOException;
import java.util.Optional;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthResponse;
import com.binarystudio.academy.slidez.domain.auth.util.AuthUtil;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.JwtProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.oauth2.Oauth2;
import com.google.api.services.oauth2.model.Userinfoplus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {

	private final GoogleOauthTokenManager tokenManager;

	private final UserService userService;

	private final JwtProvider jwtProvider;

	@Autowired
	public OAuthService(GoogleOauthTokenManager tokenManager, UserService userService, JwtProvider jwtProvider) {
		this.tokenManager = tokenManager;
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	// Legacy method
	public Optional<AuthResponse> loginWithGoogle(String code) throws IOException {
		return registerWithGoogle(code);
	}

	public Optional<AuthResponse> registerWithGoogle(String code) throws IOException {

		var tokens = this.tokenManager.fetchTokensForUser(code);
		var emailForGoogle = getEmailForGoogle(tokens);
		if (emailForGoogle.isEmpty()) {
			return Optional.empty();
		}
		var data = emailForGoogle.get();
		var user = userService.getByEmail(data.getEmail()).orElseGet(() -> {
			var newUser = userService.createByEmailAndUserData(data.getEmail(), data.getGivenName(),
					data.getFamilyName());
			return newUser;
		});
		tokenManager.saveForUser(user.getId(), tokens);

		return Optional.of(AuthUtil.createAuthResponseFromUser(user, jwtProvider));
	}

	private Optional<Userinfoplus> getEmailForGoogle(GoogleCredential oauthCreds) throws IOException {
		var userData = new Oauth2(new NetHttpTransport(), new GsonFactory(), oauthCreds).userinfo().get().execute();
		return Optional.ofNullable(userData);
	}

}
