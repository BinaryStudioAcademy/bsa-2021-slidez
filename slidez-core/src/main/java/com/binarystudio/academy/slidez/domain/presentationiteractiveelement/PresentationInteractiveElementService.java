package com.binarystudio.academy.slidez.domain.presentationiteractiveelement;

import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.dto.PresentationInteractiveElementDto;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.exception.PresentationInteractiveElementNotFoundException;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.mapper.PresentationInteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElement;
import com.binarystudio.academy.slidez.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.time.LocalDateTime.now;

@Service
public class PresentationInteractiveElementService {

	@Autowired
	private PresentationInteractiveElementRepository presentationInteractiveElementRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public PresentationInteractiveElement create(PresentationInteractiveElementDto dto) {
		var mapper = PresentationInteractiveElementMapper.INSTANCE;
		PresentationInteractiveElement presentationInteractiveElement = mapper.dtoToPresentationInteractiveElement(dto);

		LocalDateTime now = now();
		presentationInteractiveElement.setCreatedAt(now);
		presentationInteractiveElement.setUpdatedAt(now);
		return presentationInteractiveElementRepository.saveAndFlush(presentationInteractiveElement);
	}

	@Transactional
	public PresentationInteractiveElement update(PresentationInteractiveElementDto dto)
			throws PresentationInteractiveElementNotFoundException {

		if (!existsById(dto.getId())) {
			throw new PresentationInteractiveElementNotFoundException(
					"Presentation Interactive Element with such Id not found.");
		}
		var mapper = PresentationInteractiveElementMapper.INSTANCE;
		PresentationInteractiveElement presentationInteractiveElement = mapper.dtoToPresentationInteractiveElement(dto);
		presentationInteractiveElement.setUpdatedAt(now());
		presentationInteractiveElementRepository.saveAndFlush(presentationInteractiveElement);
		return presentationInteractiveElement;
	}

	@Transactional
	public void remove(UUID id) {
		presentationInteractiveElementRepository.deleteById(id);
	}

	public List<PresentationInteractiveElement> getAll() {
		return presentationInteractiveElementRepository.findAll();
	}

	public Optional<PresentationInteractiveElementDto> getById(UUID id) {
		Optional<PresentationInteractiveElement> elementOptional = presentationInteractiveElementRepository
				.findById(id);
		if (elementOptional.isEmpty()) {
			return Optional.empty();
		}
		var mapper = PresentationInteractiveElementMapper.INSTANCE;
		PresentationInteractiveElementDto dto = mapper.presentationInteractiveElementToDto(elementOptional.get());
		return Optional.of(dto);
	}

	public boolean existsById(UUID id) {
		return presentationInteractiveElementRepository.existsById(id);
	}

}
