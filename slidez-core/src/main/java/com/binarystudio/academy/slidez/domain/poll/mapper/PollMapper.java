package com.binarystudio.academy.slidez.domain.poll.mapper;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollOptionDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollOptionDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PollMapper {

	PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

	List<PollOptionDto> pollOptionsToPollOptionDtos(List<PollOption> pollOptions);

	@Mappings({ @Mapping(source = "poll.id", target = "id"), @Mapping(source = "poll.interactiveElement.type", target = "type"),
			@Mapping(source = "poll.title", target = "title"),
			@Mapping(source = "poll.isMulti", target = "isMulti"),
			@Mapping(source = "poll.isTemplate", target = "isTemplate"),
			@Mapping(target = "pollOptions", expression = "java( pollOptionsToPollOptionDtos(poll.getOptions()) )") })
	PollDto pollToPollDto(Poll poll);

	List<PollOption> createPollOptionDtosToPollOptions(List<CreatePollOptionDto> pollOptionDtos);

}
