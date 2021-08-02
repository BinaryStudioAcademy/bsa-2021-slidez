package com.binarystudio.academy.slidez.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UserDetailsDto {
        private UUID id;
        private String email;
        private String firstName;
        private String lastName;
}
