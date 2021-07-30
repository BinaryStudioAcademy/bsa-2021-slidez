package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import com.binarystudio.academy.slidez.infrastructure.validation.EmailValidator;
import com.binarystudio.academy.slidez.infrastructure.validation.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@Autowired
	private PasswordValidator passwordValidator;

	@Autowired
	private EmailValidator emailValidator;

	@PostMapping("login")
	public ResponseEntity login(@RequestBody AuthorizationRequest authorizationRequest) {
		String validationResult = validateEmailAndPassword(authorizationRequest.getEmail(), authorizationRequest.getPassword());
		if(validationResult != null ) {
			return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
		}

		Optional<AuthResponse> authResponse = authService.performLogin(authorizationRequest);
		if(authResponse.isEmpty()) {
			return new ResponseEntity("Incorrect password or email.", HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity(authResponse.get(), HttpStatus.OK);
	}

	@PostMapping("register")
	public ResponseEntity register(@RequestBody UserDto userDto) {
		String validationResult = validateEmailAndPassword(userDto.getEmail(), userDto.getPassword());
		if(validationResult != null ) {
			return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
		}

		Optional<AuthResponse> authResponse = authService.register(userDto);
		if(authResponse.isEmpty()) {
			return new ResponseEntity<>("Incorrect password or user email.", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity(authResponse.get(), HttpStatus.OK);
	}

	private String validateEmailAndPassword(String email, String password) {
		if(!passwordValidator.isValid(password)) {
			return "Incorrect password";
		}

		if(!emailValidator.isValid(email)) {
			return "Incorrect email";
		}

		return null;
	}

}
