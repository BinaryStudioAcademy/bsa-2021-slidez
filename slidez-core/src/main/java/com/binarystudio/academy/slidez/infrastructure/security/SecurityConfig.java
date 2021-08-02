package com.binarystudio.academy.slidez.infrastructure.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private void applyRouteRestrictions(HttpSecurity http) throws Exception {
        http
            .antMatcher("/**").authorizeRequests()
            // PUBLIC
            .antMatchers("/auth/**", "/").permitAll()
//                .antMatchers(HttpMethod.GET, "/*").permitAll()
            .anyRequest().authenticated()
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .httpBasic().disable()
            .formLogin().disable()

            // Set session management to stateless
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        applyRouteRestrictions(http);
        applyOAuth2Config(http);
    }

    private void applyOAuth2Config(HttpSecurity http) throws Exception {
//        http
//            .oauth2Login(oauth2Config -> oauth2Config
//                .authorizationEndpoint(auth -> {
//                    auth.baseUri("/auth/oauth2/authorize");
////                    auth.authorizationRequestRepository(authorizationRequestRepository());
//                })
//                .redirectionEndpoint(redir -> redir.baseUri("/auth/oauth2/code/*"))
////                .successHandler(oAuth2SuccessHandler())
//                );
        http.oauth2Login()
            .redirectionEndpoint().baseUri("/");
    }
}
