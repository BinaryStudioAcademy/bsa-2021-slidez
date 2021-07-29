package com.binarystudio.academy.slidez.domain.user.dto;

import com.binarystudio.academy.slidez.domain.user.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDto {
        private UUID id;
        private String email;
        private String firstName;
        private String lastName;
        @ValidPassword(lengthMin       = 11,
                       uppercaseCount  =  1,
                       specialCharacter=  1,
                       digitsCount     =  1)
        private String password;
}
