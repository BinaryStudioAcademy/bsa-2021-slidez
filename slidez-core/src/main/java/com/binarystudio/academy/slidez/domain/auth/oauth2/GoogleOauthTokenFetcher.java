package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.DataStore;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public class GoogleOauthTokenFetcher {
    private static final JsonFactory JSON_FACTORY = new GsonFactory();
    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final String PRESENTATION_SCOPE = "https://www.googleapis.com/auth/presentations";

    public void fetchTokens(String tokenId, UUID userId) throws IOException {
        final var flow = new GoogleAuthorizationCodeFlow.Builder(
            TRANSPORT,
            JSON_FACTORY,
            "cliendId",
            "clientSecret",
            List.of("https://www.googleapis.com/auth/presentations")
        )
            //replace with real data store
            .setCredentialDataStore((DataStore<StoredCredential>) new Object())
            .build();

        final var tokens = flow.newTokenRequest(tokenId).execute();
        var creds = flow.createAndStoreCredential(tokens, userId.toString());
        //todo: return creds if necessary or save them for a user
    }
}
