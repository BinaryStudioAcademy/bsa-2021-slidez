package com.binarystudio.academy.slidez.domain.user.model;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {

    PARTICIPANT, PRESENTER;

	@Override
	public String getAuthority() {
		return "ROLE_" + this.toString();
	}

}
