package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.util.Optional;

import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationByTokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class OAuthController {
    private final OAuthService oAuthService;
    @Autowired
    public OAuthController(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    @PostMapping("/login/google")
	public ResponseEntity<AuthResponse> loginGoogle(@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
        Optional<AuthResponse> authResponse = this.oAuthService
            .loginWithGoogle(authorizationByTokenRequest.getToken());
        return authResponse.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }

}
