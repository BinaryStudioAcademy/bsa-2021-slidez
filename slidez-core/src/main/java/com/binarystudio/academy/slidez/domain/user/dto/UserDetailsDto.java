package com.binarystudio.academy.slidez.domain.user.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {

	private UUID id;

	private String email;

	private String firstName;

	private String lastName;

}
