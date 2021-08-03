package com.binarystudio.academy.slidez.domain.user;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.AuthService;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    protected PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  AuthService authService;
    @Autowired
    private JwtProvider jwtProvider;

    public boolean isEmailPresent(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<UserDetailsDto> findByToken(String token) {
        String email = authService.getLoginFromToken(token);
        if (email == null || email.isEmpty()) {
            return Optional.empty();
        }
        Optional<User> user = findByEmail(email);
        UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user.get());
        return Optional.of(userDetailsDto);
    }

    public User create(UserDto userDto) {
        User user =  UserMapper.INSTANCE.userDtoToUser(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userRepository.saveAndFlush(user);
    }

    public Optional<User> getById(UUID id) {
        return userRepository.findById(id);
    }
}
