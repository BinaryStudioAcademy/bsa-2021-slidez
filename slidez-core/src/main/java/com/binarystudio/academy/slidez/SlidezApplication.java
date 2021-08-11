package com.binarystudio.academy.slidez;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SuppressWarnings({ "FinalClassCheck", "HideUtilityClassConstructor" })
class SlidezApplication {

	public static void main(String[] args) {
		//Sentry.init();
		SpringApplication.run(SlidezApplication.class, args);
	}

}
