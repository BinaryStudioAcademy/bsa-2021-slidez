package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthResponse;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@SuppressWarnings("checkstyle:Regexp")
@Service
public class OAuthService {

	private final GoogleTokenVerifier googleTokenVerifier;

	private final UserService userService;

	private final JwtProvider jwtProvider;

	@Autowired
	public OAuthService(GoogleTokenVerifier googleTokenVerifier, UserService userService, JwtProvider jwtProvider) {
		this.googleTokenVerifier = googleTokenVerifier;
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	public Optional<AuthResponse> loginWithGoogle(String idToken) {
		Optional<User> userByEmail = Optional.empty();
		try {
			GoogleIdToken.Payload verify = this.googleTokenVerifier.verify(idToken);
			String email = verify.getEmail();
			userByEmail = this.userService.findByEmail(email);
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
		return userByEmail.map(user -> {
			String token = this.jwtProvider.generateAccessToken(user);
			UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
			return AuthResponse.of(token, userDetailsDto);
		});
	}

}
