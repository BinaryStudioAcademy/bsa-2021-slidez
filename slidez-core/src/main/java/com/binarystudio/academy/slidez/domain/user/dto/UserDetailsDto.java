package com.binarystudio.academy.slidez.domain.user.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDetailsDto {
        private String email;
        private UUID id;
        private String firstName;
        private String lastName;
}
