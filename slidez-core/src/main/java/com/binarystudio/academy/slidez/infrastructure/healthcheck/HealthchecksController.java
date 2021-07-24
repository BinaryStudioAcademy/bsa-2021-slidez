package com.binarystudio.academy.slidez.infrastructure.healthcheck;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/health")
public class HealthchecksController {
    @RequestMapping("/health")
    public String getHealthStatus(){
        return "healthy!";
    }
}
