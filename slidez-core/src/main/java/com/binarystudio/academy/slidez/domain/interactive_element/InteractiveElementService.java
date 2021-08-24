package com.binarystudio.academy.slidez.domain.interactive_element;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.mapper.InteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InteractiveElementService {

	private final InteractiveElementRepository interactiveElementRepository;

	@Autowired
	public InteractiveElementService(InteractiveElementRepository interactiveElementRepository) {
		this.interactiveElementRepository = interactiveElementRepository;
	}

	@Transactional
	public void remove(UUID id) {
		interactiveElementRepository.deleteById(id);
	}

	public List<InteractiveElement> getAll() {
		return interactiveElementRepository.findAll();
	}

	public Optional<InteractiveElementDto> getById(UUID id) {
		Optional<InteractiveElement> elementOptional = interactiveElementRepository.findById(id);
		if (elementOptional.isEmpty()) {
			return Optional.empty();
		}
		var mapper = InteractiveElementMapper.INSTANCE;
		InteractiveElementDto dto = mapper.presentationInteractiveElementToDto(elementOptional.get());
		return Optional.of(dto);
	}

	public boolean existsById(UUID id) {
		return interactiveElementRepository.existsById(id);
	}

}
