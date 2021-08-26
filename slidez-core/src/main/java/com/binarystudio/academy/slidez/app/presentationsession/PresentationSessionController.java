package com.binarystudio.academy.slidez.app.presentationsession;

import com.binarystudio.academy.slidez.domain.presentation_session.PresentationSessionService;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("${v1API}/session")
public class PresentationSessionController {

	private final PresentationSessionService presentationSessionService;

	@Autowired
	public PresentationSessionController(PresentationSessionService presentationSessionService) {
		this.presentationSessionService = presentationSessionService;
	}

	@PostMapping("/new")
	public GenericResponse<CreateSessionResponseDto, PresentationSessionResponseCodes> createSession(
			@RequestBody CreateSessionRequestDto createSessionRequestDto,
			@RequestParam(name = "leaseDuration", defaultValue = "180") int leaseDuration) {
		Optional<CreateSessionResponseDto> sessionOptional = presentationSessionService
				.createSession(createSessionRequestDto, leaseDuration);
		return sessionOptional
				.<GenericResponse<CreateSessionResponseDto, PresentationSessionResponseCodes>>map(GenericResponse::new)
				.orElseGet(() -> new GenericResponse<>(null, PresentationSessionResponseCodes.COULD_NOT_ADD_SESSION));
	}

	@MessageMapping("/event/{link}")
	@SendTo("/topic/event/{link}")
	public GenericResponse<SessionResponse, PresentationSessionResponseCodes> handleEvent(
			@DestinationVariable String link, DomainEvent domainEvent) {
		return presentationSessionService.handleEvent(link, domainEvent);
	}

}
