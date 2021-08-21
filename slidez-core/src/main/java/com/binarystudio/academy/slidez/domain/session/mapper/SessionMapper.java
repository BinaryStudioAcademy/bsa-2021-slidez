package com.binarystudio.academy.slidez.domain.session.mapper;

import com.binarystudio.academy.slidez.domain.session.dto.SessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SessionMapper {

	SessionMapper INSTANCE = Mappers.getMapper(SessionMapper.class);

	@Mappings({ @Mapping(target = "id", source = "session.id"),
			@Mapping(target = "presentationId", source = "session.presentation.id"),
			@Mapping(target = "code", source = "session.link.code"),
			@Mapping(target = "status", source = "session.status"),
			@Mapping(target = "createdAt", source = "session.createdAt"),
			@Mapping(target = "updatedAt", source = "session.updatedAt") })
	SessionResponseDto mapSessionToSessionResponseDto(Session session);

}
