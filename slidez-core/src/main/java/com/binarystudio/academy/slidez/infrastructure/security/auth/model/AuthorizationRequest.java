package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import lombok.Data;

@Data
public class AuthorizationRequest {
	private String email;
	private String password;
}
