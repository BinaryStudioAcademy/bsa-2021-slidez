package com.binarystudio.academy.slidez.infrastructure.security.oauth2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecretController {

	@GetMapping("/secret")
	public String hidden() {
		return "Secret!!!";
	}

}
