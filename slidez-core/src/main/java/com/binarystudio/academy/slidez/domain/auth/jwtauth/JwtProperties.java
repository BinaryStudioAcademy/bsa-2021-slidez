package com.binarystudio.academy.slidez.domain.auth.jwtauth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {

	private String secret;

	@Value("#{new Long('${jwt.secs_to_expire_access}')}")
	private Long secondsToExpireAccess;

	@Value("#{new Long('${jwt.secs_to_expire_refresh}')}")
	private Long secondsToExpireRefresh;

}
