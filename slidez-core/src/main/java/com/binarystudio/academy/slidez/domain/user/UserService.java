package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public boolean isEmailPresent(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User create(UserDto userDto) {
        User user = convertUser(userDto);
        return userRepository.saveAndFlush(user);
    }

    private User convertUser(UserDto userDto) {
        return User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .build();
    }
}
