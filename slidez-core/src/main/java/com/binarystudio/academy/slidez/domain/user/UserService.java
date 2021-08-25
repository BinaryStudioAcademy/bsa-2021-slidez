package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfile;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfileRepository;
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

	private final UserProfileRepository profileRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
			UserProfileRepository profileRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.profileRepository = profileRepository;
	}

	public boolean isEmailPresent(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public Optional<User> getByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	public User create(String email, String password) {
		User user = new User(email, passwordEncoder.encode(password));
		return this.userRepository.save(user);
	}

	public Optional<User> getById(UUID id) {
		return this.userRepository.findById(id);
	}

	public User createByEmailAndUserData(String email, String firstName, String lastName) {
		User user = new User(email, passwordEncoder.encode(""));
		this.userRepository.save(user);
		// Attach profile

		UserProfile userProfile = new UserProfile(firstName, lastName);

		userProfile.setUser(user);
		user.setUserProfile(userProfile);

		this.profileRepository.save(userProfile);

		return user;
	}

	public List<User> getAll() {
		return this.userRepository.findAll();
	}

}
