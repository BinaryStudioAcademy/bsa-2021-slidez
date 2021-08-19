package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.auth.oauth2.exception.GoogleTokenRequestException;
import com.binarystudio.academy.slidez.domain.auth.oauth2.exception.GoogleTokenStoreException;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GoogleOauthTokenFetcher {

	private static final JsonFactory JSON_FACTORY = new JacksonFactory();

	private static final HttpTransport TRANSPORT = new NetHttpTransport();

	private static final String PRESENTATION_SCOPE = "https://www.googleapis.com/auth/presentations";

	private static final String REDIRECT_URI = "postmessage";

	private final OAuth2Properties oAuth2Properties;

	private final GoogleDataStoreFactory googleDataStoreFactory;

	private final GoogleCredentialsService googleCredentialsService;

	@Autowired
	public GoogleOauthTokenFetcher(OAuth2Properties oAuth2Properties, GoogleDataStoreFactory googleDataStoreFactory,
			GoogleCredentialsService googleCredentialsService) {
		this.oAuth2Properties = oAuth2Properties;
		this.googleDataStoreFactory = googleDataStoreFactory;
		this.googleCredentialsService = googleCredentialsService;
	}

	public GoogleTokenResponse getGoogleTokenResponse(String code) throws GoogleTokenRequestException {
		GoogleAuthorizationCodeFlow flow = buildFlow();
		try {
			return flow.newTokenRequest(code).setRedirectUri(REDIRECT_URI).execute();
		}
		catch (Throwable e) {
			throw new GoogleTokenRequestException("Google token request has failed", e);
		}
	}

	public Credential createAndStoreCredential(GoogleTokenResponse googleTokenResponse, UUID userId)
			throws GoogleTokenStoreException {
		GoogleAuthorizationCodeFlow flow = buildFlow();
		try {
			return flow.createAndStoreCredential(googleTokenResponse, userId.toString());
		}
		catch (Throwable e) {
			throw new GoogleTokenStoreException("Storing google token has failed", e);
		}
	}

	private GoogleAuthorizationCodeFlow buildFlow() {
		return new GoogleAuthorizationCodeFlow.Builder(TRANSPORT, JSON_FACTORY, oAuth2Properties.getClientId(),
				oAuth2Properties.getClientSecret(), List.of(PRESENTATION_SCOPE))
						.setCredentialDataStore(new GoogleDataStore(googleDataStoreFactory, googleCredentialsService))
						.build();
	}

}
