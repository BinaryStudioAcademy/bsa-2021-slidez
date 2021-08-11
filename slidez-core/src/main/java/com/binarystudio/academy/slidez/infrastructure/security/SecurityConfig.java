package com.binarystudio.academy.slidez.infrastructure.security;

import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final String[] PUBLIC_URLS = { "/", "/health", "/auth/**", "/swagger-ui/**", "/api-docs/**" };

    private JwtFilter jwtFilter;

    @Autowired
    public void setJwtFilter(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    private void applyRouteRestrictions(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(PUBLIC_URLS).permitAll().anyRequest().authenticated();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic().disable().formLogin().disable()

				// Set session management to stateless
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		applyRouteRestrictions(http);
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}

}
