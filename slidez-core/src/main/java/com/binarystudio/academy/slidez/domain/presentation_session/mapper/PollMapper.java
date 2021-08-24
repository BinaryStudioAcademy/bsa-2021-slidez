package com.binarystudio.academy.slidez.domain.presentation_session.mapper;

import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	@Mappings({ @Mapping(source = "poll.id", target = "id"), @Mapping(source = "poll.name", target = "name"),
			@Mapping(source = "poll.options", target = "options"),
			@Mapping(source = "poll.answers", target = "answers") })
	PollCreatedResponseDto pollToPollCreatedDtoMapper(Poll poll);

}
