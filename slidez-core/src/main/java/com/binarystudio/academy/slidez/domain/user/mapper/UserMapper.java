package com.binarystudio.academy.slidez.domain.user.mapper;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.dto.UserDto;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mappings({
        @Mapping(target = "id", source = "userDto.id"),
        @Mapping(target = "email", source = "userDto.email"),
        @Mapping(target = "firstName", source = "userDto.firstName"),
        @Mapping(target = "lastName", source = "userDto.lastName"),
        @Mapping(target = "password", source = "userDto.password")
    })
	User userDtoToUser(UserDto userDto);

    @Mappings({
        @Mapping(target = "id", source = "user.id"),
        @Mapping(target = "email", source = "user.email"),
        @Mapping(target = "firstName", source = "user.firstName"),
        @Mapping(target = "lastName", source = "user.lastName")
    })
	UserDetailsDto mapUserToUserDetailsDto(User user);

}
