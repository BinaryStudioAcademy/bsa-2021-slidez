package com.binarystudio.academy.slidez.infrastructure.web;

import com.binarystudio.academy.slidez.infrastructure.security.AllowedOriginProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	private final AllowedOriginProperties allowedOriginProperties;

	@Autowired
	public WebConfig(AllowedOriginProperties allowedOriginProperties) {
		this.allowedOriginProperties = allowedOriginProperties;
	}

}
