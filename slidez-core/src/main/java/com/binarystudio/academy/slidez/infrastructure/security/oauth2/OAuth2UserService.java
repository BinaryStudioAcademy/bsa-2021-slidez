package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import java.util.Map;
import java.util.Optional;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class OAuth2UserService extends OidcUserService {

	private final UserService userService;

	@Autowired
	public OAuth2UserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
		OidcUser oidcUser = super.loadUser(userRequest);
		Map<String, Object> attributes = oidcUser.getAttributes();
		String email = (String) attributes.get("email");
		Optional<User> userOptional = this.userService.findByEmail(email);
		if (userOptional.isEmpty()) {
			this.userService.createByEmail(email);
		}
		return oidcUser;
	}

}
