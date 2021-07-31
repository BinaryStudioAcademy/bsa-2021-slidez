package com.binarystudio.academy.slidez.app.user;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/users")
public class UserController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("userInfo")
    public ResponseEntity getByToken(@RequestParam("token") String token) {
        if(token == null || token.isEmpty()) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }

        Optional<User> user = userService.findByToken(token);
        if(user.isEmpty()) {
            return new ResponseEntity("Bad token.", HttpStatus.NOT_FOUND);
        }
        UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user.get());
        return new ResponseEntity(userDetailsDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity one(@PathVariable("id") UUID id) {
        if(id == null) {
            return new ResponseEntity<>("Invalid ID", HttpStatus.BAD_REQUEST);
        }
        Optional<User> user = userService.getById(id);
        if(user.isEmpty()) {
            return new ResponseEntity("User not found.", HttpStatus.NOT_FOUND);
        }
        UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user.get());
        return new ResponseEntity(userDetailsDto, HttpStatus.OK);
    }


}
