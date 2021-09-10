package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.UpdatePollDto;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
	public PollDto create(CreatePollDto pollDto, User owner) {
		Presentation presentation = presentationService.assertPresentationExists(pollDto.getPresentationId(), owner);

		InteractiveElement ie = new InteractiveElement();
		ie.setPresentation(presentation);
		ie.setType(InteractiveElementType.POLL);
		ie.setSlideId(pollDto.getSlideId());

		Poll poll = new Poll();
		poll.setTitle(pollDto.getTitle());
		poll.setIsMulti(pollDto.getIsMulti());
		poll.setIsTemplate(pollDto.getIsTemplate());
		poll.setOptions(pollDto.getOptions().stream().map(option -> new PollOption(option.getTitle()))
				.collect(Collectors.toList()));

		poll.setInteractiveElement(ie);
		poll.setOwner(owner);

		pollRepository.save(poll);
		return PollMapper.INSTANCE.pollToPollDto(poll);
	}

	@Transactional
	public PollDto patch(UpdatePollDto updatePollDto) {
		Poll poll = pollRepository.getById(updatePollDto.getId());
		poll.setTitle(updatePollDto.getTitle());
		poll.getOptions().clear();
		var pollOptions = poll.getOptions();
		for (var pollOption : updatePollDto.getOptions()) {
			pollOptions.add(new PollOption(pollOption.getId(), pollOption.getTitle()));
		}
		pollRepository.save(poll);

		return PollMapper.INSTANCE.pollToPollDto(poll);
	}

	@Transactional
	public void remove(UUID id) {
		pollRepository.deleteById(id);
	}

	public Optional<Poll> getById(UUID id) {
		return pollRepository.findById(id);
	}

	public Optional<Poll> getBySlideId(String slideId) {
		return pollRepository.findBySlideId(slideId);
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
