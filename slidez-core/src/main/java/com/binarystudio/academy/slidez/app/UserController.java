package com.binarystudio.academy.slidez.app;

import com.binarystudio.academy.slidez.domain.user.User;
import com.binarystudio.academy.slidez.domain.user.UserDto;
import com.binarystudio.academy.slidez.domain.user.UserService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityExistsException;
import java.util.UUID;

@RestController
@RequestMapping("users")
@Getter
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    private UUID registerUser(UserDto userDto) {
        if(userService.isEmailPresent(userDto.getEmail())) {
            throw new EntityExistsException(String.format("User with email: '%s' already exists.", userDto.getEmail()));
        }

        User newUser = userService.create(userDto);
        return newUser.getId();
    }


}
