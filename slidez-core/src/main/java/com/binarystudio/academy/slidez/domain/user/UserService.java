package com.binarystudio.academy.slidez.domain.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isEmailPresent(String email) {
        return userRepository.existsByEmail(email);
    }

    public User create(UserDto userDto) {
        User user = convertUser(userDto);
        return userRepository.saveAndFlush(user);
    }

    private User convertUser(UserDto userDto) {
        return User.builder()
                .email(userDto.getEmail())
                .passwordHash(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .build();
    }
}
