package com.binarystudio.academy.slidez;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class SlidezApplication {
	@RequestMapping("/")
	public String helloSlidez(){
		return "BSA-2021-slidez v0.0.1";
	}

	public static void main(String[] args) {
		SpringApplication.run(SlidezApplication.class, args);
	}

}
