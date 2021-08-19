package com.binarystudio.academy.slidez.domain.presentationsession.mapper;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	PollCreatedResponseDto pollToPollCreatedDtoMapper(Poll poll);

}
