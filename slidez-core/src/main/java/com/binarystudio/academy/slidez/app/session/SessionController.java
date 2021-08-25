package com.binarystudio.academy.slidez.app.session;

import java.util.Optional;

import com.binarystudio.academy.slidez.domain.session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${v1API}/sessions")
public class SessionController {

	private final SessionService sessionService;

	@Autowired
	public SessionController(SessionService sessionService) {
		this.sessionService = sessionService;
	}

	@PostMapping("/new")
	public GenericResponse<CreateSessionResponseDto, SessionResponseCodes> createSession(
			@RequestBody CreateSessionRequestDto createSessionRequestDto,
			@RequestParam(name = "leaseDuration", defaultValue = "180") int leaseDuration) {
		Optional<CreateSessionResponseDto> sessionOptional = sessionService.create(createSessionRequestDto,
				leaseDuration);
		return sessionOptional
				.<GenericResponse<CreateSessionResponseDto, SessionResponseCodes>>map(GenericResponse::new)
				.orElseGet(() -> new GenericResponse<>(null, SessionResponseCodes.COULD_NOT_ADD_SESSION));
	}

	@MessageMapping("/event/{link}")
	@SendTo("/topic/event/{link}")
	public GenericResponse<Object, SessionResponseCodes> handleEvent(@DestinationVariable String link,
			DomainEvent domainEvent) {
		return sessionService.handleEvent(link, domainEvent);
	}

}
