package com.binarystudio.academy.slidez.infrastructure.security;

import com.binarystudio.academy.slidez.infrastructure.security.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final SecurityProperties securityProperties;

	private final JwtFilter jwtFilter;

	@Autowired
	public SecurityConfig(SecurityProperties securityProperties, JwtFilter jwtFilter) {
		this.securityProperties = securityProperties;
		this.jwtFilter = jwtFilter;
	}

	private void applyRouteRestrictions(HttpSecurity http) throws Exception {
		http.authorizeRequests().anyRequest().permitAll();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic().disable().formLogin().disable()

				// Set session management to stateless
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

}
