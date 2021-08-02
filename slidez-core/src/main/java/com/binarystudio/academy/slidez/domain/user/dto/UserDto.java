package com.binarystudio.academy.slidez.domain.user.dto;

import java.util.UUID;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UserDto {
    private UUID id;

    @NotNull
    private String email;
    private String firstName;
    private String lastName;

    @NotNull
    private String password;
}
