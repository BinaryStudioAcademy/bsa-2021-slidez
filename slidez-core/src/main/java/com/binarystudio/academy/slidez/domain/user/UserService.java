package com.binarystudio.academy.slidez.domain.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

	public Optional<User> getByToken(String token) {
		String email = jwtProvider.getLoginFromToken(token);
		if (email == null) {
			return Optional.empty();
		}
		return getByEmail(email);
	}

	public Optional<UserDetailsDto> getDetailsByToken(String token) {
		Optional<User> userOptional = getByToken(token);
		return userOptional.map(UserMapper.INSTANCE::mapUserToUserDetailsDto);
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

}
