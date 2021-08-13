package com.binarystudio.academy.slidez.app.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.infrastructure.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/users")
public class UserController {

	// TODO: EVERYTHING CONNECTED WITH TOKEN MUST BE REMOVED !!!

	private final UserService userService;

	private final JwtProvider jwtProvider;

	@Autowired
	public UserController(UserService userService, JwtProvider jwtProvider) {
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	// THIS METHOD WILL BE REMOVED AND I LEAVE IT HERE ONLY BECAUSE OF BACKWARDS
	// COMPATIBILITY
	@GetMapping("userInfo")
	public ResponseEntity<Object> getUserInfo(@RequestParam("token") String token) {
		if (token == null || token.isEmpty()) {
			return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
		}
		Optional<String> email = jwtProvider.getLoginFromToken(token);
		if (email.isPresent()) {
			Optional<User> userOptional = this.userService.getByEmail(email.get());
			if (userOptional.isEmpty()) {
				return new ResponseEntity<>("Bad token.", HttpStatus.BAD_REQUEST);
			}
			UserMapper userMapper = UserMapper.INSTANCE;
			return new ResponseEntity<>(userMapper.mapUserToUserDetailsDto(userOptional.get()), HttpStatus.OK);
		}
		return new ResponseEntity<>("Bad token.", HttpStatus.BAD_REQUEST);
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

}
