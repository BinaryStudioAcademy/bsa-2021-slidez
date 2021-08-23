package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.dto.PresentationInteractiveElementDto;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.mapper.PresentationInteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
		LocalDateTime now = LocalDateTime.now();
		Presentation presentation = Presentation.builder().createdAt(now).updatedAt(now).name(name).build();
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

	public Collection<PresentationInteractiveElementDto> getInteractiveElements(String presentationLink) {
		Presentation presentation = this.presentationRepository.findByLink(presentationLink)
				.orElseThrow(() -> new PresentationNotFoundException(
						String.format("Not found presentation with id %s", presentationLink)));
		;
		Set<PresentationInteractiveElement> presentationInteractiveElements = presentation
				.getPresentationInteractiveElements();
		PresentationInteractiveElementMapper mapper = PresentationInteractiveElementMapper.INSTANCE;
		return presentationInteractiveElements.stream().map(mapper::presentationInteractiveElementToDto)
				.collect(Collectors.toList());
	}

}
