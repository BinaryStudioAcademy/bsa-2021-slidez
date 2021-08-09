package com.binarystudio.academy.slidez.infrastructure.security.auth;

import java.util.Optional;

import com.binarystudio.academy.slidez.infrastructure.security.auth.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {

	private final AuthService authService;

	private final AuthorizationRequestValidator authorizationRequestValidator;

	@Autowired
	public AuthController(AuthService authService, AuthorizationRequestValidator authorizationRequestValidator) {
		this.authService = authService;
		this.authorizationRequestValidator = authorizationRequestValidator;
	}

	@InitBinder("authorizationRequest")
	public void authRequestValidatorBinder(WebDataBinder binder) {
		binder.addValidators(this.authorizationRequestValidator);
	}

	@PostMapping("login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthorizationRequest authorizationRequest) {
		Optional<AuthResponse> authResponse = authService.performLogin(authorizationRequest);
		return authResponse.map(resp -> new ResponseEntity<>(resp, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}

	@PostMapping("register")
	public ResponseEntity<AuthResponse> register(@RequestBody @Validated AuthorizationRequest authorizationRequest,
			BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Optional<AuthResponse> authResponseOptional = authService.register(authorizationRequest);
		return authResponseOptional.map(resp -> new ResponseEntity<>(resp, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}

	@PostMapping("login-by-token")
	public ResponseEntity<AuthResponse> loginByToken(
			@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
		Optional<AuthResponse> authResponseOptional = authService.performLoginByToken(authorizationByTokenRequest);
		return authResponseOptional.map(resp -> new ResponseEntity<>(resp, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}

	@PostMapping("refresh-tokens")
	public ResponseEntity<RefreshTokensResponse> loginByRefreshToken(
			@RequestBody RefreshTokensRequest refreshTokensRequest) {
		Optional<RefreshTokensResponse> tokensResponseOptional = authService.getRefreshedTokens(refreshTokensRequest);
		return tokensResponseOptional.map(resp -> new ResponseEntity<>(resp, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}

}
