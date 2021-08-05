package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PresentationService {

	private final PresentationRepository presentationRepository;

	@Autowired
	public PresentationService(PresentationRepository presentationRepository) {
		this.presentationRepository = presentationRepository;
	}

	public Presentation add(String name) {
		Presentation presentation = new Presentation(null, name, "", LocalDateTime.now(), null);
		return presentationRepository.save(presentation);
	}

	public Presentation get(UUID id) {
		return presentationRepository.getById(id);
	}

	public Presentation update(UUID id, Presentation presentation) {
		presentation.setId(id);
		return presentationRepository.save(presentation);
	}

	public void remove(UUID id) {
		presentationRepository.deleteById(id);
	}

}
