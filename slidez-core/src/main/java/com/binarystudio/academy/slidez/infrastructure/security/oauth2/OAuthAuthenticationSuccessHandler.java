package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final UserService userService;

	private final JwtProvider jwtProvider;

	private final OAuth2Properties oAuth2Properties;

	@Autowired
	public OAuthAuthenticationSuccessHandler(UserService userService, JwtProvider jwtProvider,
			OAuth2Properties oAuth2Properties) {
		this.userService = userService;
		this.jwtProvider = jwtProvider;
		this.oAuth2Properties = oAuth2Properties;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException, IOException {
		if (response.isCommitted()) {
			return;
		}
		DefaultOAuth2User oidcUser = (DefaultOAuth2User) authentication.getPrincipal();
		String email = oidcUser.getAttribute("email");
		Optional<User> userOptional = this.userService.findByEmail(email);
		User user = userOptional.orElseThrow();
		String token = this.jwtProvider.generateAccessToken(user);
		String redirectionUrl = UriComponentsBuilder.fromUriString(this.oAuth2Properties.getRedirectUri())
				.queryParam("auth_token", token).build().toUriString();
		getRedirectStrategy().sendRedirect(request, response, redirectionUrl);
	}

}
