package com.binarystudio.academy.slidez.infrastructure.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {

	private String secret;

	@SuppressWarnings("checkstyle:MemberName")
	private Long secs_to_expire_access;

	@SuppressWarnings("checkstyle:MemberName")
	private Long secs_to_expire_refresh;

}
