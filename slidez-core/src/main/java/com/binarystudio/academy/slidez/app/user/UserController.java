package com.binarystudio.academy.slidez.app.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/users")
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("{id}")
	public GenericResponse<UserDetailsDto, UserResponseCodes> getById(@PathVariable("id") UUID id) {
		Optional<User> userOptional = this.userService.getById(id);
		if (userOptional.isEmpty()) {
			return new GenericResponse<>(null, UserResponseCodes.NOT_FOUND);
		}

		User user = userOptional.get();
		UserDetailsDto userDetailsDto = UserMapper.INSTANCE.mapUserToUserDetailsDto(user);
		return new GenericResponse<>(userDetailsDto, null);
	}

   // @PostMapping("")
   // public ResponseEntity<Object> updateUserByToken(@RequestParam("token") String token, @RequestBody UserDto userDto) {
    //    if (token == null || token.isEmpty()) {
     //       return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
      //  }
      //  Optional<User> user = this.userService.updateUserByToken(token, userDto);
      //  if (user.isEmpty()) {
      //      return new ResponseEntity<>("Bad token.", HttpStatus.BAD_REQUEST);
      //  }
     //   return new ResponseEntity<>(user.get(), HttpStatus.OK);
   // }
}
