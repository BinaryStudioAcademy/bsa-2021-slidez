package com.binarystudio.academy.slidez.app.poll;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/polls")
public class PollController {

    @GetMapping
    public String hello() {
        return "Polls hello";
    }

}
