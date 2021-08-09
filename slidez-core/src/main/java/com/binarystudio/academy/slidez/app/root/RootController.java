package com.binarystudio.academy.slidez.app.root;

import com.binarystudio.academy.slidez.domain.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RootController {

	@Autowired
	SessionService service;

	@GetMapping
	public String helloSlidez() {

		return "BSA-2021-slidez v0.0.1";

	}

}
