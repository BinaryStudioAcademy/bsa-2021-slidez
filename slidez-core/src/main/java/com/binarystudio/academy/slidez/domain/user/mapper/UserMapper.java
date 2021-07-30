package com.binarystudio.academy.slidez.domain.user.mapper;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.mapstruct.Mapper;

@Mapper
public abstract class UserMapper {
    public abstract User userDtoToUser(UserDto userDto);
    public abstract UserDetailsDto mapUserToUserDetailsDto(User user);
}
