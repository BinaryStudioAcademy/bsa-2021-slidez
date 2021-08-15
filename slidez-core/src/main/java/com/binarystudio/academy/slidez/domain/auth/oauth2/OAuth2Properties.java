package com.binarystudio.academy.slidez.domain.auth.oauth2;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("oauth2")
@Getter
@Setter
public class OAuth2Properties {

	private String clientId;

}
