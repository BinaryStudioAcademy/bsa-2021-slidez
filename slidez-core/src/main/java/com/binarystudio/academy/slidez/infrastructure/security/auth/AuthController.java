package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
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

@RestController
@RequestMapping("auth")
public class AuthController {

	private final AuthService authService;
	private final PasswordValidator passwordValidator;
	private final EmailValidator emailValidator;

	@Autowired
	public AuthController(AuthService authService, PasswordValidator passwordValidator, EmailValidator emailValidator) {
		this.authService = authService;
		this.passwordValidator = passwordValidator;
		this.emailValidator = emailValidator;
	}

	@PostMapping("login")
	public ResponseEntity login(@RequestBody AuthorizationRequest authorizationRequest) {
		if(!passwordValidator.isValid(authorizationRequest.getPassword())) {
			return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
		}

		if(!emailValidator.isValid(authorizationRequest.getEmail())) {
			return new ResponseEntity<>("Incorrect email", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(authService.performLogin(authorizationRequest), HttpStatus.OK);
	}

	@PostMapping("register")
	public ResponseEntity register(@RequestBody UserDto userDto) {
		if(!passwordValidator.isValid(userDto.getPassword())) {
			return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
		}

		if(!emailValidator.isValid(userDto.getEmail())) {
			return new ResponseEntity<>("Incorrect email", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(authService.register(userDto), HttpStatus.OK);
	}

}
