package com.binarystudio.academy.slidez.infrastructure.security;

import com.binarystudio.academy.slidez.infrastructure.security.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final AllowedOriginProperties allowedOriginProperties;

	private final SecurityProperties securityProperties;

	private final JwtFilter jwtFilter;

	@Autowired
	public SecurityConfig(AllowedOriginProperties allowedOriginProperties, SecurityProperties securityProperties,
			JwtFilter jwtFilter) {
		this.allowedOriginProperties = allowedOriginProperties;
		this.securityProperties = securityProperties;
		this.jwtFilter = jwtFilter;
	}

	private void applyRouteRestrictions(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(securityProperties.getPublicUrlPatterns().toArray(new String[0]))
				.permitAll().anyRequest().authenticated();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic().disable().formLogin().disable().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		applyRouteRestrictions(http);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.applyPermitDefaultValues();
		String[] allowedOrigins = allowedOriginProperties.getAllowedOrigins();
		configuration.setAllowedOrigins(List.of(allowedOrigins));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"));
		configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "X-Requested-With",
				"Access-Control-Allow-Headers", "Access-Control-Allow-Origin"));
		configuration.setAllowCredentials(false);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
