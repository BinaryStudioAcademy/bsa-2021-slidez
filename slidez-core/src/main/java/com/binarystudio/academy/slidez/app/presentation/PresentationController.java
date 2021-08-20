package com.binarystudio.academy.slidez.app.presentation;

import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.dto.PresentationInteractiveElementDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/presentation")
public class PresentationController {

	private final PresentationService presentationService;

	@Autowired
	public PresentationController(PresentationService presentationService) {
		this.presentationService = presentationService;
	}

	@GetMapping("/{id}/interactions")
	public GenericResponse<Collection<PresentationInteractiveElementDto>, String> getInteractiveElements(
			@PathVariable("id") UUID id) throws EntityNotFoundException {
		Collection<PresentationInteractiveElementDto> interactiveElements = presentationService
				.getInteractiveElements(id);
		return new GenericResponse<>(interactiveElements);
	}

}
