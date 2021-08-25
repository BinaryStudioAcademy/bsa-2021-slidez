package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.mapper.InteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PresentationService {

	private final PresentationRepository presentationRepository;

	@Autowired
	public PresentationService(PresentationRepository presentationRepository) {
		this.presentationRepository = presentationRepository;
	}

	public Presentation add(String name) {
		Presentation presentation = new Presentation(name);
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

	public Set<InteractiveElement> getInteractiveElements(UUID presentationId) throws PresentationNotFoundException {
		Presentation presentation = get(presentationId).orElseThrow(
				() -> new PresentationNotFoundException(String.format("No presentation with id = %s", presentationId)));
		return presentation.getInteractiveElements();
	}

	public Collection<InteractiveElementDto> getInteractiveElements(String presentationLink)
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
