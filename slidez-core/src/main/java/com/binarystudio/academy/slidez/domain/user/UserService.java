package com.binarystudio.academy.slidez.domain.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	protected PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtProvider jwtProvider;

	public boolean isEmailPresent(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public Optional<User> findByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	public Optional<UserDetailsDto> findByToken(String token) {
		String email = this.jwtProvider.getLoginFromToken(token);
		if (email == null) {
			return Optional.empty();
		}
		Optional<User> userOptional = findByEmail(email);
		User user = userOptional.get();
		UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
		return Optional.of(userDetailsDto);
	}

	public User create(UserDto userDto) {
		User user = UserMapper.INSTANCE.userDtoToUser(userDto);
		user.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
		return this.userRepository.saveAndFlush(user);
	}

	public Optional<User> getById(UUID id) {
		return this.userRepository.findById(id);
	}

}
