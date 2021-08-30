package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;

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
	public PollDto create(CreatePollDto pollDto, User actor) {
		var presentation = presentationService.assertPresentationExists(pollDto.getPresentationLink(), actor);

		var ie = new InteractiveElement();
		ie.setPresentation(presentation);
		ie.setType(InteractiveElementType.POLL);
		ie.setSlideId(pollDto.getSlideId());

		var poll = new Poll();
		poll.setTitle(pollDto.getTitle());
		poll.setIsMulti(false);
		poll.setIsTemplate(false);
		poll.setOptions(pollDto.getOptions().stream().map(option -> new PollOption(option.getTitle()))
				.collect(Collectors.toList()));
		// TODO: DUPLICATE CODE: WE SET THAT TO INNER OBJECT
		poll.setSlideId(pollDto.getSlideId());
		poll.setPresentation(presentation);

		poll.setInteractiveElement(ie);
		poll.setOwner(actor);

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
		return pollRepository.findBySlideIdIs(slideId);
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
