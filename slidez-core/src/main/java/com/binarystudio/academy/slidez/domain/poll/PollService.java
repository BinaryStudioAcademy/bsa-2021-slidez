package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class PollService {

	private final PollRepository pollRepository;

	private final PresentationService presentationService;

	@Autowired
	public PollService(PollRepository pollRepository, PresentationService presentationService) {
		this.pollRepository = pollRepository;
		this.presentationService = presentationService;
	}

	@Transactional
	@Deprecated
	public PollDto create(CreatePollDto pollDto, UUID userId) {
		Poll poll = PollMapper.INSTANCE.pollFromCreatePollDto(pollDto);
		poll.setOwnerId(userId);
		presentationService.addInteractiveElement(pollDto.getPresentationId(), poll, userId);
		return PollMapper.INSTANCE.pollToPollDto(poll);
	}

	@Transactional
	public void remove(UUID id) {
		pollRepository.deleteById(id);
	}

	public Optional<Poll> getById(UUID id) {
		return pollRepository.findById(id);
	}

	public Optional<PollDto> getPollDtoById(UUID id) {
		Optional<Poll> pollOptional = pollRepository.findById(id);
		if (pollOptional.isEmpty()) {
			return Optional.empty();
		}
		PollDto out = PollMapper.INSTANCE.pollToPollDto(pollOptional.get());
		return Optional.of(out);
	}

}
