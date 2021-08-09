package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("oauth2")
@Getter
@Setter
public class OAuth2Properties {

	@Value("#{'${oauth2.client-id}'}")
	private String clientId;

}
