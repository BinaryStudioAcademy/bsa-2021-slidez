package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.auth.oauth2.model.GoogleCredentials;
import com.binarystudio.academy.slidez.domain.user.UserRepository;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.google.api.client.auth.oauth2.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Clock;
import com.google.api.services.slides.v1.SlidesScopes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class GoogleOauthTokenManager {

	private static final JsonFactory JSON_FACTORY = new GsonFactory();

	private static final HttpTransport TRANSPORT = new NetHttpTransport();

	private static final String REDIRECT_URI = "postmessage";

	private final GoogleCredentialsRepository googleCredentialsRepository;

	private final UserRepository userRepository;

	private final OAuth2Properties oAuth2Properties;

	private static class RefreshListener implements CredentialRefreshListener {

		private final GoogleCredentialsRepository repository;

		RefreshListener(GoogleCredentialsRepository repository) {
			this.repository = repository;
		}

		@Override
		public void onTokenResponse(Credential credential, TokenResponse tokenResponse) throws IOException {
			var oldTokens = this.repository.findByAccessToken(credential.getAccessToken())
					.orElseThrow(() -> new RuntimeException("Trying to refresh non-existent token pair"));

			oldTokens.setAccessToken(tokenResponse.getAccessToken());
			oldTokens.setRefreshToken(tokenResponse.getRefreshToken());
			oldTokens.setExpirationTimeMillis(tokenResponse.getExpiresInSeconds() * 1000);

			this.repository.save(oldTokens);
		}

		@Override
		public void onTokenErrorResponse(Credential credential, TokenErrorResponse tokenErrorResponse)
				throws IOException {
			throw new RuntimeException("Token refresh attempt failed");
		}

	}

	@Autowired
	public GoogleOauthTokenManager(GoogleCredentialsRepository googleCredentialsRepository,
			UserRepository userRepository, OAuth2Properties oAuth2Properties) {
		this.googleCredentialsRepository = googleCredentialsRepository;
		this.userRepository = userRepository;
		this.oAuth2Properties = oAuth2Properties;
	}

	public Optional<GoogleCredential> getCredentialPairForUser(UUID userId) {
		return this.googleCredentialsRepository.findByUserId(userId).map(this::createFromCredentials);
	}

	public GoogleCredential fetchTokensForUser(String authorizationCode) {
		try {
			var response = new GoogleAuthorizationCodeTokenRequest(TRANSPORT, JSON_FACTORY,
					oAuth2Properties.getClientId(), oAuth2Properties.getClientSecret(), authorizationCode, REDIRECT_URI)
							.setGrantType("authorization_code")
							.setScopes(List.of(SlidesScopes.PRESENTATIONS, SlidesScopes.DRIVE))
							.set("access_type", "offline").execute();

			var credential = new GoogleCredential.Builder().setClock(Clock.SYSTEM)
					.addRefreshListener(new RefreshListener(this.googleCredentialsRepository))
					.setJsonFactory(JSON_FACTORY).setTransport(TRANSPORT).build();
			credential.setAccessToken(response.getAccessToken());
			if (response.getRefreshToken() != null) {
				credential.setRefreshToken(response.getRefreshToken());
			}
			credential.setExpirationTimeMilliseconds(response.getExpiresInSeconds() * 1000);

			return credential;
		}
		catch (Exception error) {
			throw new RuntimeException(error.getMessage());
		}
	}

	public GoogleCredentials saveForUser(UUID userId, GoogleCredential response) {
		GoogleCredentials googleCredentials = getByUserId(userId).orElse(new GoogleCredentials());
		LocalDateTime now = LocalDateTime.now();
		if (googleCredentials.getUser() == null) {
			User user = userRepository.getById(userId);
			googleCredentials.setUser(user);
			googleCredentials.setCreatedAt(now);
		}
		googleCredentials.setUpdatedAt(now);
		googleCredentials.setAccessToken(response.getAccessToken());
		if (response.getRefreshToken() != null) {
			googleCredentials.setRefreshToken(response.getRefreshToken());
		}
		googleCredentials.setExpirationTimeMillis(response.getExpiresInSeconds() * 1000);

		return googleCredentialsRepository.save(googleCredentials);
	}

	private GoogleCredential createFromCredentials(GoogleCredentials credentials) {
		var credential = new GoogleCredential.Builder().setClock(Clock.SYSTEM)
				.addRefreshListener(new RefreshListener(this.googleCredentialsRepository)).setJsonFactory(JSON_FACTORY)
				.setTransport(TRANSPORT).build();
		credential.setAccessToken(credentials.getAccessToken());
		credential.setRefreshToken(credentials.getRefreshToken());
		credential.setExpirationTimeMilliseconds(credentials.getExpirationTimeMillis());

		return credential;
	}

	private Optional<GoogleCredentials> getByUserId(UUID userId) {
		return googleCredentialsRepository.findByUserId(userId);
	}

}
