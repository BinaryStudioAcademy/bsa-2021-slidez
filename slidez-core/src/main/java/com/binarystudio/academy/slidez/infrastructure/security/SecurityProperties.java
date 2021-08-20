package com.binarystudio.academy.slidez.infrastructure.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class SecurityProperties {

	private static final String ALLOWS_EVERYTHING_AFTER = "**";

	private static final List<String> INFRASTRUCTURE_PATHS = List.of("/", "/health");

	private static final List<String> PUBLIC_URLS_THAT_REQUIRE_PREFIX_AND_ALLOW_EVERYTHING_AFTER = List.of("/auth/",
			"/users/");

	private static final List<String> PUBLIC_URLS_THAT_ALLOW_EVERYTHING_AFTER = List.of("/ws/", "/swagger-ui/",
			"/api-docs/");

	private List<String> publicUrlPatterns = new ArrayList<>();

	private List<String> publicUrlStarts = new ArrayList<>();

	public SecurityProperties(@Value("${v1API}") String prefix) {
		publicUrlPatterns.addAll(INFRASTRUCTURE_PATHS);
		publicUrlPatterns.addAll(PUBLIC_URLS_THAT_ALLOW_EVERYTHING_AFTER.stream()
				.map(p -> p.concat(ALLOWS_EVERYTHING_AFTER)).collect(Collectors.toList()));
		publicUrlPatterns.addAll(PUBLIC_URLS_THAT_REQUIRE_PREFIX_AND_ALLOW_EVERYTHING_AFTER.stream()
				.map(p -> prefix.concat(p).concat(ALLOWS_EVERYTHING_AFTER)).collect(Collectors.toList()));
		this.publicUrlPatterns = Collections.unmodifiableList(publicUrlPatterns);

		publicUrlStarts.addAll(PUBLIC_URLS_THAT_REQUIRE_PREFIX_AND_ALLOW_EVERYTHING_AFTER.stream().map(prefix::concat)
				.collect(Collectors.toList()));
		publicUrlStarts.addAll(PUBLIC_URLS_THAT_ALLOW_EVERYTHING_AFTER);
		this.publicUrlStarts = Collections.unmodifiableList(publicUrlStarts);

	}

	public List<String> getInfrastructurePaths() {
		return INFRASTRUCTURE_PATHS;
	}

	public List<String> getPublicUrlPatterns() {
		return publicUrlPatterns;
	}

	public List<String> getPublicUrlStarts() {
		return publicUrlStarts;
	}

}
