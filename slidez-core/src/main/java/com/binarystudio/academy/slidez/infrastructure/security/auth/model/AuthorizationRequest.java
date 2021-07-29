package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import com.binarystudio.academy.slidez.domain.user.ValidPassword;
import lombok.Data;

@Data
public class AuthorizationRequest {
	private String email;
	@ValidPassword
	private String password;
}
