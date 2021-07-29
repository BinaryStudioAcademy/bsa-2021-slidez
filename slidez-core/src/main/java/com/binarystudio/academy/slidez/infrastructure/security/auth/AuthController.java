package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import com.binarystudio.academy.slidez.infrastructure.validation.EmailValidator;
import com.binarystudio.academy.slidez.infrastructure.validation.PasswordValidator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthController {
	private final AuthService authService;
	private final PasswordValidator passwordValidator;
	private final EmailValidator emailValidator;

	@PostMapping("login")
	@ResponseStatus(HttpStatus.OK)
	public AuthResponse login(@RequestBody AuthorizationRequest authorizationRequest) {
		if(!passwordValidator.isValid(authorizationRequest.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
		}

		if(!emailValidator.isValid(authorizationRequest.getEmail())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email");
		}
		return authService.performLogin(authorizationRequest);
	}

	@PostMapping("register")
	@ResponseStatus(HttpStatus.OK)
	public AuthResponse register(@RequestBody UserDto userDto) {
		if(!passwordValidator.isValid(userDto.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
		}

		if(!emailValidator.isValid(userDto.getEmail())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email");
		}

		return authService.register(userDto);
	}

}
