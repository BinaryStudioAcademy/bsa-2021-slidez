package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.mapper.InteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.exception.NoSuchUserException;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PresentationService {

    private final UserService userService;

	private final PresentationRepository presentationRepository;

	@Autowired
	public PresentationService(UserService userService, PresentationRepository presentationRepository) {
        this.userService = userService;
        this.presentationRepository = presentationRepository;
	}

	/**
	 * Creates new Presentation with random link
	 */
	public Presentation add(String name, UUID userId) throws NoSuchUserException {
		Presentation presentation = new Presentation(name);
		presentation.setLink(UUID.randomUUID().toString());
        User byId = userService.getById(userId)
            .orElseThrow(() -> new NoSuchUserException(String.format("No such user with id = %s", userId.toString())));
        presentation.setUser(byId);
        return presentationRepository.save(presentation);
	}

	/**
	 * Fetches presentation with specified id or creates new presentation with random name
	 * if it does not exist and adds interactive element to it
	 */
	public Presentation addInteractiveElement(UUID presentationId, InteractiveElement interactiveElement, UUID userId) {
		Presentation presentation = get(presentationId).orElse(add(UUID.randomUUID().toString(), userId));
		presentation.getInteractiveElements().add(interactiveElement);
		return presentationRepository.save(presentation);
	}

	public Optional<Presentation> get(UUID id) {
		return presentationRepository.findById(id);
	}

	public Presentation update(PresentationUpdateDto dto) {
		presentationRepository.update(dto);
		return presentationRepository.getById(dto.getId());
	}

	public void remove(UUID id) {
		presentationRepository.deleteById(id);
	}

	public Collection<InteractiveElementDto> getInteractiveElementDtos(String presentationLink)
			throws IllegalElementTypeException {
		Presentation presentation = this.presentationRepository.findByLink(presentationLink)
				.orElseThrow(() -> new PresentationNotFoundException(
						String.format("Not found presentation with link %s", presentationLink)));
		Set<InteractiveElement> presentationInteractiveElements = presentation.getInteractiveElements();
		InteractiveElementMapper mapper = InteractiveElementMapper.INSTANCE;
		return presentationInteractiveElements.stream().map(mapper::interactiveElementToTypeRelatedDto)
				.collect(Collectors.toList());
	}

}
