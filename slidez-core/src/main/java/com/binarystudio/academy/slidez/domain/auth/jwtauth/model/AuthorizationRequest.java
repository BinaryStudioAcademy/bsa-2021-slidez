package com.binarystudio.academy.slidez.domain.auth.jwtauth.model;

import lombok.Data;

@Data
public class AuthorizationRequest {

	private String email;

	private String password;

}
