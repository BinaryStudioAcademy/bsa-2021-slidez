package com.binarystudio.academy.slidez.user.dto;

import com.binarystudio.academy.slidez.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private UUID id;

    private String email;

    private String firstName;

    private String lastName;

    private String password;

    public static UserDto fromEntity(User user) {
        return UserDto
            .builder()
            .id(user.getId())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .password(user.getPassword())
            .build();
    }
}
