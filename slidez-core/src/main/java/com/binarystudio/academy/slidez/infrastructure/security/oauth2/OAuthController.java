package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import com.binarystudio.academy.slidez.infrastructure.security.auth.model.AuthorizationByTokenRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class OAuthController {

	@PostMapping("/login/google")
	public void loginGoogle(@RequestBody AuthorizationByTokenRequest authorizationByTokenRequest) {
        System.out.println("Login: ");
        System.out.println(authorizationByTokenRequest);
    }

}
