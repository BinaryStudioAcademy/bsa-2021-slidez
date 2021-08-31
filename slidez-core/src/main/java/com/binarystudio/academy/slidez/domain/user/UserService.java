package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserPasswordRequest;
import com.binarystudio.academy.slidez.domain.user.dto.UserPasswordResponse;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfile;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
		this.userRepository.save(user);

		// Attach profile

		UserProfile userProfile = new UserProfile(user);
		user.setUserProfile(userProfile);
		this.profileRepository.save(userProfile);
		return user;
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

	public Optional<UserDetailsDto> updateUserData(UserDetailsDto userDetailsDto) {
		Optional<User> user = userRepository.findById(userDetailsDto.getId());
		if (user.isEmpty()) {
			return Optional.empty();
		}

		User updateUser = user.get();
		LocalDateTime updatedAt = LocalDateTime.now();

		UserProfile updateUserProfile = updateUser.getUserProfile();

		updateUserProfile
				.setFirstName(selectNotEmptyData(updateUserProfile.getFirstName(), userDetailsDto.getFirstName()));
		updateUserProfile
				.setLastName(selectNotEmptyData(updateUserProfile.getLastName(), userDetailsDto.getLastName()));
		updateUserProfile.setUpdatedAt(updatedAt);
		updateUser.setUserProfile(updateUserProfile);

		updateUser.setEmail(userDetailsDto.getEmail());
		updateUser.setUpdatedAt(updatedAt);
		return Optional.of(UserMapper.INSTANCE.mapUserToUserDetailsDto(this.userRepository.save(updateUser)));
	}

	public String selectNotEmptyData(String currentData, String newData) {
		return (newData.isEmpty()) ? currentData : newData;
	}

	public Optional<UserPasswordResponse> updatePassword(UserPasswordRequest userPasswordRequest) {
		Optional<User> user = userRepository.findById(userPasswordRequest.getId());
		if (user.isEmpty()) {
			return Optional.empty();
		}

		User updateUser = user.get();
		LocalDateTime updatedAt = LocalDateTime.now();
		updateUser.setUpdatedAt(updatedAt);

		updateUser.setPassword(passwordEncoder.encode(userPasswordRequest.getPassword()));

		return Optional.of(UserMapper.INSTANCE.mapUserToUserPasswordResponse(this.userRepository.save(updateUser)));
	}

    public void delete(UUID id) {
        userRepository.deleteWithId(id);
    }

}
