package com.binarystudio.academy.slidez.app.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.PresentationSessionService;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.*;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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

	@MessageMapping("/snapshot/{link}")
	@SendTo("/topic/snapshot/{link}")
	public SnapshotResponseDto getPresentationSnapshot(@DestinationVariable String link) {
		return presentationSessionService.getSnapshot(link);
	}

	@MessageMapping("/create/poll/{link}")
	@SendTo("/topic/created/poll/{link}")
	public PollCreatedResponseDto createPoll(@DestinationVariable String link,
			@Payload CreatePollRequestDto createPollRequestDto) {
		return presentationSessionService.createPoll(link, createPollRequestDto);
	}

	@MessageMapping("/answer/poll/{link}")
	@SendTo("/topic/answered/poll/{link}")
	public PollAnsweredDto answerPoll(@DestinationVariable String link, @Payload AnswerPollDto answerPollDto) {
		return presentationSessionService.answerPoll(link, answerPollDto);
	}

}
