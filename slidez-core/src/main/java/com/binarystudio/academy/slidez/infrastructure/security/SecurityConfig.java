package com.binarystudio.academy.slidez.infrastructure.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final String[] PUBLIC_URLS = { "/", "/health", "/auth/**", "/swagger-ui/**", "/api-docs/**"  };

	private void applyRouteRestrictions(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(PUBLIC_URLS).permitAll().anyRequest().authenticated();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic().disable().formLogin().disable()

				// Set session management to stateless
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		applyRouteRestrictions(http);
	}

}
