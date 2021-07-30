package com.binarystudio.academy.slidez.app.user;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.infrastructure.security.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("${v1API}/users")
public class UserController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("userInfo")
    public ResponseEntity getUserByToken(@RequestParam("token") String token) {
        if(token == null || token.isEmpty()) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }

        Optional<UserDetailsDto> userDetailsDto = userService.findByToken(token);
        if(userDetailsDto.isEmpty()) {
            return new ResponseEntity("Bad token.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(userDetailsDto.get(), HttpStatus.OK);
    }

}
