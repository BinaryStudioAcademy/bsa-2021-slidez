package com.binarystudio.academy.slidez.app.auth;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthResponse;
import com.binarystudio.academy.slidez.domain.auth.oauth2.GoogleTokenIdException;
import com.binarystudio.academy.slidez.domain.auth.oauth2.OAuthService;
import com.binarystudio.academy.slidez.domain.auth.oauth2.dto.AuthorizationByOAuthTokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/auth")
public class OAuthController {

	private final OAuthService oAuthService;

	@Autowired
	public OAuthController(OAuthService oAuthService) {
		this.oAuthService = oAuthService;
	}

	// LATER WE WILL RETURN MEANINGFUL MESSAGES IN THESE ENUMS, SO DON'T CHANGE THE CODE
	// TO MORE CONCISE
	@PostMapping("/login/google")
	public GenericResponse<AuthResponse, AuthResponseCodes> loginWithGoogle(
			@RequestBody AuthorizationByOAuthTokenRequest authorizationByTokenRequest) {
		try {
			Optional<AuthResponse> authResponse = oAuthService.loginWithGoogle(authorizationByTokenRequest.getToken());
			if (authResponse.isEmpty()) {
				return new GenericResponse<>(null, AuthResponseCodes.UNAUTHORIZED);
			}
			return new GenericResponse<>(authResponse.get());
		}
		catch (GoogleTokenIdException e) {
			return new GenericResponse<>(null, AuthResponseCodes.INVALID_TOKEN);
		}
	}

	@PostMapping("/register/google")
	public GenericResponse<AuthResponse, AuthResponseCodes> registerWithGoogle(
			@RequestBody AuthorizationByOAuthTokenRequest authorizationByTokenRequest) {
		try {
			Optional<AuthResponse> authResponse = oAuthService
					.registerWithGoogle(authorizationByTokenRequest.getToken());
			if (authResponse.isEmpty()) {
				return new GenericResponse<>(null, AuthResponseCodes.UNAUTHORIZED);
			}
			return new GenericResponse<>(authResponse.get());
		}
		catch (GoogleTokenIdException e) {
			return new GenericResponse<>(null, AuthResponseCodes.INVALID_TOKEN);
		}
	}

}
