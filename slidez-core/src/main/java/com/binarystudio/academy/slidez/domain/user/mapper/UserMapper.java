package com.binarystudio.academy.slidez.domain.user.mapper;

import com.binarystudio.academy.slidez.domain.user.dto.UserDetailsDto;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	@Mappings({ @Mapping(target = "id", source = "user.id"), @Mapping(target = "email", source = "user.email"),
			@Mapping(target = "firstName", source = "user.userProfile.firstName"),
			@Mapping(target = "lastName", source = "user.userProfile.lastName") })
	UserDetailsDto mapUserToUserDetailsDto(User user);

}
