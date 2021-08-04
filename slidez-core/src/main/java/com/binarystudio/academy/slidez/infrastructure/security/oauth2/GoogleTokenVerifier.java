package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

import com.binarystudio.academy.slidez.infrastructure.security.exception.GoogleTokenIdException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GoogleTokenVerifier {

	private static final HttpTransport TRANSPORT = new NetHttpTransport();

	private static final JsonFactory JSON_FACTORY = new GsonFactory();

	private final OAuth2Properties oAuth2Properties;

	@Autowired
	public GoogleTokenVerifier(OAuth2Properties oAuth2Properties) {
		this.oAuth2Properties = oAuth2Properties;
	}

	public GoogleIdToken.Payload verify(String idTokenString)
			throws GeneralSecurityException, IOException, GoogleTokenIdException {
		return verifyToken(idTokenString);
	}

	private GoogleIdToken.Payload verifyToken(String idTokenString)
			throws GeneralSecurityException, IOException, GoogleTokenIdException {
		final GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(TRANSPORT, JSON_FACTORY)
				.setIssuers(Arrays.asList("https://accounts.google.com", "accounts.google.com"))
				.setAudience(Collections.singletonList(this.oAuth2Properties.getClientId())).build();

		GoogleIdToken idToken;
		try {
			idToken = verifier.verify(idTokenString);
		}
		catch (IllegalArgumentException e) {
			throw new GoogleTokenIdException(e);
		}
		if (idToken == null) {
			throw new GoogleTokenIdException("idToken is invalid");
		}
		return idToken.getPayload();
	}

}
