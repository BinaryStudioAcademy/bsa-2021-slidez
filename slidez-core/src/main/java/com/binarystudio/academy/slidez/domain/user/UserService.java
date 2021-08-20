package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.JwtProvider;
import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthorizationByTokenRequest;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;

	private final UserRepository userRepository;

	private final JwtProvider jwtProvider;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, JwtProvider jwtProvider) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
	}

	public boolean isEmailPresent(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public Optional<User> getByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	public User create(String email, String password) {
		User user = new User();
		user.setEmail(email);
		user.setPassword(this.passwordEncoder.encode(password));
		return this.userRepository.save(user);
	}

	public Optional<User> getById(UUID id) {
		return this.userRepository.findById(id);
	}

	public User createByEmail(String email) {
		return create(email, "");
	}

	public List<User> getAll() {
		return this.userRepository.findAll();
	}

	public Optional<User> getByToken(AuthorizationByTokenRequest authorizationByTokenRequest) {
		System.out.println(authorizationByTokenRequest);
		Optional<String> email = jwtProvider.getLoginFromToken(authorizationByTokenRequest.getToken());
		System.out.println(email);
		if (email.isEmpty()) {
			return Optional.empty();
		}
		return getByEmail(email.get());
	}

}
