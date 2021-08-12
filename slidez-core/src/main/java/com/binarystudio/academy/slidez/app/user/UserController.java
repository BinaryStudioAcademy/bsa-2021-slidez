package com.binarystudio.academy.slidez.app.user;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<Object> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("userInfo")
    public ResponseEntity<Object> getUserInfo(@RequestParam("token") String token) {
        if (token == null || token.isEmpty()) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        Optional<UserDetailsDto> userDetailsDto = this.userService.getDetailsByToken(token);
        if (userDetailsDto.isEmpty()) {
            return new ResponseEntity<>("Bad token.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userDetailsDto.get(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") UUID id) {
        if (id == null) {
            return new ResponseEntity<>("Invalid ID", HttpStatus.BAD_REQUEST);
        }
        Optional<User> userOptional = this.userService.getById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Object> updateUserByToken(@RequestParam("token") String token, @RequestBody UserDto userDto) {
        if (token == null || token.isEmpty()) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        Optional<User> user = this.userService.updateUserByToken(token, userDto);
        if (user.isEmpty()) {
            return new ResponseEntity<>("Bad token.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
}
