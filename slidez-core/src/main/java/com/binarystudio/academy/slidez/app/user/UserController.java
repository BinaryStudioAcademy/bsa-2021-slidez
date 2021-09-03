package com.binarystudio.academy.slidez.app.user;

import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserPasswordRequest;
import com.binarystudio.academy.slidez.domain.user.dto.UserPasswordResponse;
import com.binarystudio.academy.slidez.domain.user.mapper.UserMapper;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/users")
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

	@GetMapping
	public GenericResponse<List<User>, UserResponseCodes> getAll() {
		List<User> userOptional = this.userService.getAll();
		if (userOptional.isEmpty()) {
			return new GenericResponse<>(null, UserResponseCodes.NOT_FOUND);
		}

		return new GenericResponse<>(userOptional, null);
	}

	@PostMapping("update-profile")
	public GenericResponse<UserDetailsDto, UserResponseCodes> update(
			@RequestBody @Validated UserDetailsDto userDetailsDto) {
		Optional<UserDetailsDto> userResponseOptional = userService.updateUserData(userDetailsDto);
		if (userResponseOptional.isEmpty()) {
			return new GenericResponse<>(null, UserResponseCodes.NOT_FOUND);
		}
		return new GenericResponse<>(userResponseOptional.get());
	}

	@PostMapping("update-password")
	public GenericResponse<UserPasswordResponse, UserResponseCodes> updatePassword(
			@RequestBody @Validated UserPasswordRequest userPasswordRequest) {
		Optional<UserPasswordResponse> userResponseOptional = userService.updatePassword(userPasswordRequest);
		if (userResponseOptional.isEmpty()) {
			return new GenericResponse<>(null, UserResponseCodes.NOT_FOUND);
		}
		return new GenericResponse<>(userResponseOptional.get());
	}

	@GetMapping("me")
	public GenericResponse<UserDetailsDto, UserResponseCodes> getUserData(Principal principal) {
		var actor = ((UsernamePasswordAuthenticationToken) principal);
		var user = ((User) actor.getPrincipal());

		return new GenericResponse<>(UserMapper.INSTANCE.mapUserToUserDetailsDto(user));
	}

	@DeleteMapping
	public void deleteUser(Principal principal) {
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) token.getPrincipal();
		userService.delete(user.getId());
	}

}
