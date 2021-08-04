package com.binarystudio.academy.slidez.infrastructure.security;

import com.binarystudio.academy.slidez.infrastructure.security.oauth2.OAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final OAuth2UserService oAuth2UserService;

	private final SimpleUrlAuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	public SecurityConfig(OAuth2UserService oAuth2UserService,
			SimpleUrlAuthenticationSuccessHandler authenticationSuccessHandler) {
		this.oAuth2UserService = oAuth2UserService;
		this.authenticationSuccessHandler = authenticationSuccessHandler;
	}

	private void applyRouteRestrictions(HttpSecurity http) throws Exception {
		http.antMatcher("/**").authorizeRequests()
				// PUBLIC
				.antMatchers("/auth/**").permitAll().antMatchers(HttpMethod.GET, "/").permitAll().anyRequest()
				.authenticated();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic().disable().formLogin().disable()

				// Set session management to stateless
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		applyRouteRestrictions(http);
//		applyOAuth2Config(http);
	}

	private void applyOAuth2Config(HttpSecurity http) throws Exception {
		http.oauth2Login().userInfoEndpoint().oidcUserService(this.oAuth2UserService).and()
				.successHandler(this.authenticationSuccessHandler);
	}

}
