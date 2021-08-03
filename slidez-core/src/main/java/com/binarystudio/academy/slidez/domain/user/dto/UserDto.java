package com.binarystudio.academy.slidez.domain.user.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class UserDto {

	private UUID id;

	@NotNull
	private String email;

	private String firstName;

	private String lastName;

	@NotNull
	private String password;

>>>>>>>>> Temporary merge branch 2
}
