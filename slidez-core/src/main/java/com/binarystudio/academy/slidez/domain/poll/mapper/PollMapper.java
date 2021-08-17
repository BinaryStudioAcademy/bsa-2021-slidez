package com.binarystudio.academy.slidez.domain.poll.mapper;

import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	PollDto pollToPollDto(Poll poll);

	Poll pollDtoToPoll(PollDto pollDto);

	PollResponseDto pollToPollResponseDto(Poll poll);

	Poll pollResponseDtoToPoll(PollResponseDto pollResponseDto);

}
