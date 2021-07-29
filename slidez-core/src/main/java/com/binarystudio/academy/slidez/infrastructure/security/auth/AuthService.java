package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityExistsException;

@Service
public class AuthService {

	private final UserService userService;
	private final JwtProvider jwtProvider;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(UserService userService, JwtProvider jwtProvider, PasswordEncoder passwordEncoder) {
		this.userService = userService;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthResponse performLogin(AuthorizationRequest authorizationRequest)  {
		var userOptional = userService.findByEmail(authorizationRequest.getEmail());
		User user = userOptional
				.orElseThrow(() ->new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

		if (!passwordsMatch(authorizationRequest.getPassword(), user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
		}
		return AuthResponse.of(jwtProvider.generateAccessToken(user), mapUserUserDetailsDto(user));
	}

	private boolean passwordsMatch(String rawPw, String encodedPw) {
		return passwordEncoder.matches(rawPw, encodedPw);
	}

	public AuthResponse register(UserDto userDto) {
		if(userService.isEmailPresent(userDto.getEmail())) {
			throw new EntityExistsException(String.format("User with email: '%s' already exists.", userDto.getEmail()));
		}

		User user = userService.create(userDto);

		return AuthResponse.of(jwtProvider.generateAccessToken(user), mapUserUserDetailsDto(user));
	}

	public UserDetailsDto mapUserUserDetailsDto(User user) {
		return   UserDetailsDto.builder()
				.id(user.getId())
				.email(user.getEmail())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.build();
	}

}
