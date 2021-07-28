package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.UserDto;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
	@Autowired
	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("login")
	public AuthResponse login(@RequestBody AuthorizationRequest authorizationRequest) {
		return authService.performLogin(authorizationRequest);
	}

	@PostMapping("register")
	public AuthResponse register(@RequestBody UserDto userDto) {
		return authService.register(userDto);
	}

}
