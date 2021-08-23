package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.user.model.UserRole;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfile;
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

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}

	public boolean isEmailPresent(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public Optional<User> getByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	public User create(String email, String password) {
        User user = new User(email, passwordEncoder.encode(password));
        user.setRole(UserRole.PARTICIPANT);
		return this.userRepository.save(user);
	}

	public Optional<User> getById(UUID id) {
		return this.userRepository.findById(id);
	}

	public User createByEmailAndUserData(String email, String firstName, String lastName) {
		User user = new User(email, passwordEncoder.encode(""));
		UserProfile userProfile = new UserProfile(firstName, lastName);
        user.setRole(UserRole.PARTICIPANT);
		user.setUserProfile(userProfile);
		return this.userRepository.save(user);
	}

	public List<User> getAll() {
		return this.userRepository.findAll();
	}

}
