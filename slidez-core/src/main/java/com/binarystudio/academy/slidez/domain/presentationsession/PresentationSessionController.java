package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.CreatePollRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.PollCreatedResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.ws.SnapshotResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/session")
public class PresentationSessionController {

	private final PresentationSessionService presentationSessionService;

	@Autowired
	public PresentationSessionController(PresentationSessionService presentationSessionService) {
		this.presentationSessionService = presentationSessionService;
	}

	@PostMapping("/new")
	public ResponseEntity<CreateSessionResponseDto> createSession(
			@RequestBody CreateSessionRequestDto createSessionRequestDto,
			@RequestParam(name = "leaseDuration", defaultValue = "180") int leaseDuration) {
		Optional<CreateSessionResponseDto> sessionOptional = presentationSessionService
				.createSession(createSessionRequestDto, leaseDuration);
		return sessionOptional.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}

	@MessageMapping("/snapshot/{link}")
	@SendTo("/topic/snapshot/{link}/")
	public SnapshotResponseDto getPresentationSnapshot(@PathVariable String link) {
		return presentationSessionService.getSnapshot(link);
	}

	@MessageMapping("/poll-created/{link}")
	@SendTo("/topic/poll-created/{link}/")
	public PollCreatedResponseDto createPoll(@PathVariable String link,
			@Payload CreatePollRequestDto createPollRequestDto) {
		return presentationSessionService.createPoll(link, createPollRequestDto);
	}

}
