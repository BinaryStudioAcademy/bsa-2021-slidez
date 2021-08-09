package com.binarystudio.academy.slidez.infrastructure.security.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokensResponse {

	private String accessToken;

	private String refreshToken;

}
