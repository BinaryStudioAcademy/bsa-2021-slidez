package com.binarystudio.academy.slidez.infrastructure.security.auth;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.user.UserValidator;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationByTokenRequest;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@Autowired
	private UserValidator userValidator;

	@PostMapping("login")
	public ResponseEntity<Object> login(@RequestBody AuthorizationRequest authorizationRequest) {
		String validationResult = this.userValidator.isEmailAndPasswordValid(authorizationRequest.getEmail(),
				authorizationRequest.getPassword());
		if (validationResult != null) {
			return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
		}

		Optional<AuthResponse> authResponse = this.authService.performLogin(authorizationRequest);
		if (authResponse.isEmpty()) {
			return new ResponseEntity("Incorrect password or email.", HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(authResponse.get(), HttpStatus.OK);
	}

	@PostMapping("register")
	public ResponseEntity<Object> register(@RequestBody UserDto userDto) {
		String validationResult = this.userValidator.isEmailAndPasswordValid(userDto.getEmail(), userDto.getPassword());
		if (validationResult != null) {
			return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
		}

		Optional<AuthResponse> authResponse = this.authService.register(userDto);
		if (authResponse.isEmpty()) {
			return new ResponseEntity<>("Incorrect password or user email.", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity(authResponse.get(), HttpStatus.OK);
	}

	@PostMapping("login-by-token")
	public ResponseEntity<AuthResponse> loginByToken(
			@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
		Optional<AuthResponse> authResponseOptional = this.authService.performLoginByToken(authorizationByTokenRequest);
		return authResponseOptional.map(authResponse -> new ResponseEntity<>(authResponse, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}

}
