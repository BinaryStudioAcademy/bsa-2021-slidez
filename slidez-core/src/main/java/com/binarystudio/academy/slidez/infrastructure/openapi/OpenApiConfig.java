package com.binarystudio.academy.slidez.infrastructure.openapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Slidez App")
                .description("Our purpose is to improve the engagement with the audience during online" +
                        " and offline meetings using moderated Q&A sessions, live polls and other.")
                .version("v0.0.1");

        return new OpenAPI().info(info);
    }
}
