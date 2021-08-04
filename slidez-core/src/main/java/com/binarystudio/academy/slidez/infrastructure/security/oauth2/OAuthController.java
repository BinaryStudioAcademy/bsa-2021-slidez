package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationByTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/auth")
public class OAuthController {

    private final GoogleTokenVerifier googleTokenVerifier;

    @Autowired
    public OAuthController(GoogleTokenVerifier googleTokenVerifier) {
        this.googleTokenVerifier = googleTokenVerifier;
    }

    @PostMapping("/login/google")
	public void loginGoogle(@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
        System.out.println(authorizationByTokenRequest);
        try {
            GoogleIdToken.Payload verify = this.googleTokenVerifier.verify(authorizationByTokenRequest.getToken());
            System.out.println(verify.getEmail());
        }
        catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
        }
    }

}
