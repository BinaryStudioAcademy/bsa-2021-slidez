package com.binarystudio.academy.slidez.infrastructure.security.auth;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationRequest;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.Optional;

@Service
public class AuthService {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<AuthResponse> performLogin(AuthorizationRequest authorizationRequest) {
		var userOptional = userService.findByEmail(authorizationRequest.getEmail());
		if (userOptional.isEmpty()) {
			return Optional.empty();
		}

		User user = userOptional.get();

		if (!passwordsMatch(authorizationRequest.getPassword(), user.getPassword())) {
			return Optional.empty();
		}

		var mapper = UserMapper.INSTANCE;
		UserDetailsDto userDetailsDto = mapper.mapUserToUserDetailsDto(user);
		return Optional.of(AuthResponse.of(jwtProvider.generateAccessToken(user), userDetailsDto));
	}

	private boolean passwordsMatch(String rawPw, String encodedPw) {
		return passwordEncoder.matches(rawPw, encodedPw);
	}

	public Optional<AuthResponse> register(UserDto userDto) {
		if (userService.isEmailPresent(userDto.getEmail())) {
			throw new EntityExistsException(String.format("User with email: '%s' already exists.", userDto.getEmail()));
		}

		User user = userService.create(userDto);

		UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
		return Optional.of(AuthResponse.of(jwtProvider.generateAccessToken(user), userDetailsDto));
	}

	public String getLoginFromToken(String token) {
		return jwtProvider.getLoginFromToken(token);
	}

}
