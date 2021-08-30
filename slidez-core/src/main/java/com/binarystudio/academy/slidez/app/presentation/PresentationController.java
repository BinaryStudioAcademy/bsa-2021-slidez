package com.binarystudio.academy.slidez.app.presentation;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;

@RestController
@RequestMapping("${v1API}/presentation")
public class PresentationController {

	private final PresentationService presentationService;

	@Autowired
	public PresentationController(PresentationService presentationService) {
		this.presentationService = presentationService;
	}

	@GetMapping("{link}/interactions")
	public GenericResponse<Collection<InteractiveElementDto>, String> getInteractiveElements(
			@PathVariable("link") String link) throws EntityNotFoundException, IllegalElementTypeException {
		Collection<InteractiveElementDto> interactiveElements = presentationService.getInteractiveElementDtos(link);
		return new GenericResponse<>(interactiveElements);
	}

}
