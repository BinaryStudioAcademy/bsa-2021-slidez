package com.binarystudio.academy.slidez.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserDto {
    private String email;
    private String nickname;

    @ValidPassword(lengthMin = 11,
            uppercaseCount = 1,
            specialCharacter = 1,
            digitsCount = 1)
    private String password;
}
