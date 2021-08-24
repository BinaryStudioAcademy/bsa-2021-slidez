package com.binarystudio.academy.slidez.domain.presentation_session.mapper;

import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation_session.model.PollOption;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class MapperToPoll {

	public Poll pollResponseDtoToPoll(PollResponseDto pollResponseDto) {
		if (pollResponseDto == null) {
			return null;
		}

		UUID id = pollResponseDto.getId();
		String name = pollResponseDto.getName();

		Poll poll = new Poll(id, name);

		poll.setOptions(pollOptionListToPollOptionList(pollResponseDto.getOptions()));

		return poll;
	}

	protected List<PollOption> pollOptionListToPollOptionList(
			List<com.binarystudio.academy.slidez.domain.poll.model.PollOption> list) {
		if (list == null) {
			return null;
		}

		List<PollOption> listNew = new ArrayList<PollOption>(list.size());
		for (com.binarystudio.academy.slidez.domain.poll.model.PollOption pollOption : list) {
			listNew.add(PollOption.builder().id(pollOption.getId()).name(pollOption.getTitle()).build());
		}
		return listNew;
	}

}