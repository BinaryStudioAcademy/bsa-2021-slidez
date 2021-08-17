package com.binarystudio.academy.slidez.domain.user;

//import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;

	private final UserRepository userRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}

    public boolean isEmailPresent(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public Optional<User> getByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	public User create(String email, String password) {
		User user = new User();
		user.setEmail(email);
		user.setPassword(this.passwordEncoder.encode(password));
		return this.userRepository.save(user);
	}

    public Optional<User> getById(UUID id) {
		return this.userRepository.findById(id);
	}

	public User createByEmail(String email) {
		return create(email, "");
	}

   // @Transactional
   // public Optional<User> updateUserByToken(String token, UserDto userDto) {
   //     String email = this.authService.getLoginFromToken(token);
  //      if (email == null) {
  //          return Optional.empty();
   //     }
   //     Optional<User> userOptional = findByEmail(email);
   //     User updatedUser = userOptional.orElseThrow();
    //    updatedUser.setFirstName(userDto.getFirstName());
    //    updatedUser.setLastName(userDto.getLastName());
    //    this.userRepository.saveAndFlush(updatedUser);
    //    User user = UserMapper.INSTANCE.userDtoToUser(userDto);
     //   return Optional.of(user);
  //  }

  //  public List<User> findAll() {
  //      return this.userRepository.findAll();
  //  }
}
