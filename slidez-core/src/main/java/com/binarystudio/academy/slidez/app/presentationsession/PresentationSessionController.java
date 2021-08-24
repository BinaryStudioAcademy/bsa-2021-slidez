package com.binarystudio.academy.slidez.app.presentationsession;

import com.binarystudio.academy.slidez.domain.presentation_session.PresentationSessionService;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentation_session.dto.ws.*;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
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
	public GenericResponse<SnapshotResponseDto, PresentationSessionResponseCodes> getPresentationSnapshot(
			@DestinationVariable String link) {
		Optional<SnapshotResponseDto> snapshotOptional = presentationSessionService.getSnapshot(link);
		if (snapshotOptional.isEmpty()) {
			return new GenericResponse<>(null, PresentationSessionResponseCodes.COULD_NOT_LOAD_SNAPSHOT);
		}
		return new GenericResponse<>(snapshotOptional.get());
	}

    @MessageMapping("/event/{link}")
    @SendTo("/topic/event/{link}")
    public GenericResponse<Object, PresentationSessionResponseCodes> handleEvent(
        @DestinationVariable String link, DomainEvent domainEvent) {
        return null;
    }

//	@MessageMapping("/create/poll/{link}")
//	@SendTo("/topic/created/poll/{link}")
//	public GenericResponse<PollCreatedResponseDto, PresentationSessionResponseCodes> createPoll(
//			@DestinationVariable String link, @Payload CreatePollRequestDto createPollRequestDto) {
//		Optional<PollCreatedResponseDto> pollOptional = presentationSessionService.createPoll(link,
//				createPollRequestDto);
//		if (pollOptional.isEmpty()) {
//			return new GenericResponse<>(null, PresentationSessionResponseCodes.COULD_NOT_CREATE_POLL);
//		}
//		return new GenericResponse<>(pollOptional.get());
//	}
//
//	@MessageMapping("/answer/poll/{link}")
//	@SendTo("/topic/answered/poll/{link}")
//	public GenericResponse<PollAnsweredDto, PresentationSessionResponseCodes> answerPoll(
//			@DestinationVariable String link, @Payload AnswerPollDto answerPollDto) {
//		Optional<PollAnsweredDto> pollAnsweredOptional = presentationSessionService.answerPoll(link, answerPollDto);
//		if (pollAnsweredOptional.isEmpty()) {
//			return new GenericResponse<>(null, PresentationSessionResponseCodes.COULD_NOT_ANSWER_POLL);
//		}
//		return new GenericResponse<>(pollAnsweredOptional.get());
//	}

}
