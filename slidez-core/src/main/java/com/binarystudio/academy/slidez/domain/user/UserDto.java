package com.binarystudio.academy.slidez.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class UserDto {
    private UUID id;
    private String email;
    private String nickname;

    @ValidPassword(lengthMin = 11,
            uppercaseCount = 1,
            specialCharacter = 1,
            digitsCount = 1,
            message = "{ValidPassword.user.password}")
    private String password;
}
