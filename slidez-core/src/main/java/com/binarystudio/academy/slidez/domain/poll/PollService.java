package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentation.PresentationRepository;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.PresentationInteractiveElementCreator;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.PresentationInteractiveElementRepository;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElementType;
import com.binarystudio.academy.slidez.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.time.LocalDateTime.now;

@Service
public class PollService {

	@Autowired
	private PollRepository pollRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
    private PresentationInteractiveElementCreator peCreator;

	@Transactional
	public Poll create(CreatePollDto pollDto, UUID userId) {
        final var now = now();
        var pe = peCreator.forPoll(pollDto.getPresentationId(), userId);
		var poll = Poll.builder()
            .isMulti(false)
            .isTemplate(false)
            .name(pollDto.getTitle())
            .options(pollDto.getOptions().stream().map(PollOption::createFromDto).collect(Collectors.toList()))
            .owner(pe)
            .createdAt(now)
            .updatedAt(now)
            .build();

		return pollRepository.saveAndFlush(poll);
	}

	@Transactional
	public Poll update(PollDto pollDto) throws PollNotFoundException {
		if (!existsById(pollDto.getId())) {
			throw new PollNotFoundException("Poll with such Id not found.");
		}
		Poll poll = PollMapper.INSTANCE.pollDtoToPoll(pollDto);
		poll.setUpdatedAt(now());
		pollRepository.saveAndFlush(poll);
		return poll;
	}

	@Transactional
	public void remove(UUID id) {
		pollRepository.deleteById(id);
	}

	public List<Poll> getAll() {
		return pollRepository.findAll();
	}

	public Optional<PollResponseDto> getById(UUID id) {
		Optional<Poll> pollOptional = pollRepository.findById(id);
		if (pollOptional.isEmpty()) {
			return Optional.empty();
		}
		PollResponseDto pollResponseDto = PollMapper.INSTANCE.pollToPollResponseDto(pollOptional.get());
		return Optional.of(pollResponseDto);
	}

	public boolean existsById(UUID id) {
		return pollRepository.existsById(id);
	}

}
