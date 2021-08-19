package com.binarystudio.academy.slidez.domain.session.mapper;

import com.binarystudio.academy.slidez.domain.session.dto.SessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SessionMapper {

	SessionMapper INSTANCE = Mappers.getMapper(SessionMapper.class);

	Session mapSessionUpdateDtoToSession(SessionUpdateDto sessionUpdateDto);

	SessionResponseDto mapSessionToSessionResponseDto(Session session);

}
