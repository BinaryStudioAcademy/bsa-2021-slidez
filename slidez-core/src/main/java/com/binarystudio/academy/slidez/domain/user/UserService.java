package com.binarystudio.academy.slidez.domain.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public User createByEmailAndUserData(String email, String firstName, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(this.passwordEncoder.encode(""));
        user.setFirstName(firstName);
        user.setEmail(lastName);
        return this.userRepository.save(user);
    }

}
