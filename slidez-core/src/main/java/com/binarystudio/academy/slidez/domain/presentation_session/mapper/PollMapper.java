package com.binarystudio.academy.slidez.domain.presentation_session.mapper;

import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	@Mappings({ @Mapping(source = "sessionPoll.id", target = "id"),
			@Mapping(source = "sessionPoll.name", target = "name"),
			@Mapping(source = "sessionPoll.options", target = "options"),
			@Mapping(source = "sessionPoll.answers", target = "answers") })
	PollCreatedResponseDto sessionPollToPollCreatedDtoMapper(SessionPoll sessionPoll);

}
