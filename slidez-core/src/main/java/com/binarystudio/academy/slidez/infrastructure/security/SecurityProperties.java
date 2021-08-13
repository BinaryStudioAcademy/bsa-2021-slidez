package com.binarystudio.academy.slidez.infrastructure.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@SuppressWarnings("checkstyle:HideUtilityClassConstructor")
@Configuration
public class SecurityProperties {

	private static final String MATCH_EVERYTHING_AFTER = "**";

	private static final List<String> URLS_THAT_WILL_ALLOW_EVERYTHING_AFTER = List.of("/auth/", "/ws/", "/swagger-ui/",
			"/api-docs/");

	private static final List<String> INFRASTRUCTURE_PATHS = List.of("/", "/health");

	private List<String> publicUrlPatterns;

	private List<String> publicUrlStarts;

	public SecurityProperties(@Value("${v1API}") String prefix) {
		this.publicUrlPatterns = URLS_THAT_WILL_ALLOW_EVERYTHING_AFTER.stream()
				.map(start -> prefix.concat(start).concat(MATCH_EVERYTHING_AFTER)).collect(Collectors.toList());
		this.publicUrlPatterns.addAll(INFRASTRUCTURE_PATHS);
		this.publicUrlPatterns = Collections.unmodifiableList(publicUrlPatterns);
		this.publicUrlStarts = URLS_THAT_WILL_ALLOW_EVERYTHING_AFTER.stream().map(prefix::concat)
				.collect(Collectors.toList());
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
