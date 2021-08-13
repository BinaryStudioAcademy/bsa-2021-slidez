package com.binarystudio.academy.slidez.infrastructure.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@SuppressWarnings("checkstyle:HideUtilityClassConstructor")
@Configuration
@Getter
@Setter
public class SecurityProperties {

	private static final List<String> PUBLIC_URL_SUFFIXES = List.of("/", "/health", "/auth/**", "ws/**",
			"/swagger-ui/**", "/api-docs/**");

	private List<String> publicUrlPatterns;

	public SecurityProperties(@Value("${v1API}") String prefix) {
		this.publicUrlPatterns = PUBLIC_URL_SUFFIXES.stream().map(prefix::concat).collect(Collectors.toList());
	}

}
