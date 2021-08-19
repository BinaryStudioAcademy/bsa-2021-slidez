package com.binarystudio.academy.slidez.domain.presentationsession.mapper;

import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	PollCreatedResponseDto pollToPollCreatedDtoMapper(Poll poll);

    Poll pollResponseDtoToPoll(PollResponseDto pollResponseDto);

    com.binarystudio.academy.slidez.domain.presentationsession.model.PollOption
            map(com.binarystudio.academy.slidez.domain.poll.model.PollOption value);
}
