package com.binarystudio.academy.slidez.app.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/users")
public class UserController {

    @GetMapping
    public String hello() {
        return "Users hello";
    }
}
