package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("session")
public class PresentationSessionController {

	private final PresentationSessionService presentationSessionService;

	@Autowired
	public PresentationSessionController(PresentationSessionService presentationSessionService) {
		this.presentationSessionService = presentationSessionService;
	}

	@RequestMapping("/new")
	public ResponseEntity<CreateSessionResponseDto> createSession(
			@RequestBody CreateSessionRequestDto createSessionRequestDto,
			@RequestParam(name = "leaseDuration", defaultValue = "180") int leaseDuration) {
		Optional<CreateSessionResponseDto> sessionOptional = presentationSessionService
				.createSession(createSessionRequestDto, leaseDuration);
		return sessionOptional.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}

}
