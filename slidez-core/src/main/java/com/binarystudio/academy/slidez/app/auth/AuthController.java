package com.binarystudio.academy.slidez.app.auth;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.*;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.AuthService;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.validation.AuthorizationRequestValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${v1API}/auth")
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
	public GenericResponse<AuthResponse, AuthResponseCodes> login(
			@RequestBody AuthorizationRequest authorizationRequest) {
		Optional<AuthResponse> authResponse = authService.performLogin(authorizationRequest);
		if (authResponse.isEmpty()) {
			return new GenericResponse<>(null, AuthResponseCodes.UNAUTHORIZED);
		}
		return new GenericResponse<>(authResponse.get());
	}

	@PostMapping("register")
	public GenericResponse<AuthResponse, AuthResponseCodes> register(
			@RequestBody @Validated AuthorizationRequest authorizationRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return new GenericResponse<>(null, AuthResponseCodes.INVALID_CREDENTIALS);
		}
		Optional<AuthResponse> authResponseOptional = authService.register(authorizationRequest);
		if (authResponseOptional.isEmpty()) {
			return new GenericResponse<>(null, AuthResponseCodes.INVALID_CREDENTIALS);
		}
		return new GenericResponse<>(authResponseOptional.get());
	}

	@PostMapping("login-by-token")
	public GenericResponse<AuthResponse, AuthResponseCodes> loginByToken(
			@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
		Optional<AuthResponse> authResponseOptional = authService.performLoginByToken(authorizationByTokenRequest);
		if (authResponseOptional.isEmpty()) {
			return new GenericResponse<>(null, AuthResponseCodes.UNAUTHORIZED);
		}
		return new GenericResponse<>(authResponseOptional.get());
	}

	@PostMapping("refresh-tokens")
	public GenericResponse<RefreshTokensResponse, AuthResponseCodes> loginByRefreshToken(
			@RequestBody RefreshTokensRequest refreshTokensRequest) {
		Optional<RefreshTokensResponse> tokensResponseOptional = authService.getRefreshedTokens(refreshTokensRequest);
		if (tokensResponseOptional.isEmpty()) {
			return new GenericResponse<>(null, AuthResponseCodes.UNAUTHORIZED);
		}
		return new GenericResponse<>(tokensResponseOptional.get());
	}

}
