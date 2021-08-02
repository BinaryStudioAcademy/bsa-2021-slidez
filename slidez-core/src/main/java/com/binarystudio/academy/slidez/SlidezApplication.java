package com.binarystudio.academy.slidez;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.sentry.spring.EnableSentry;

@SpringBootApplication
@EnableSentry(dsn = "https://b579813c296046399a14368064320494@o938867.ingest.sentry.io/5888744")
@SuppressWarnings({"FinalClassCheck", "HideUtilityClassConstructor"}) class SlidezApplication {
	public static void main(String[] args) {
		SpringApplication.run(SlidezApplication.class, args);
	}
}
