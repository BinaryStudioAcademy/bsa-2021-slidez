package com.binarystudio.academy.slidez.infrastructure.healthcheck;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @PostMapping("/auth/register")
    public String register(){
        return "{\"token\": \"register\"}";
    }

    @PostMapping("/auth/login")
    public String login(){
        return "{\"token\": \"login\"}";
    }

}
