package com.binarystudio.academy.slidez.app.poll;

import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/polls")
public class PollController {

	private final PollService pollService;

	@Autowired
	public PollController(PollService pollService) {
		this.pollService = pollService;
	}

	@GetMapping("/{id}")
	public GenericResponse<PollDto, PollResponseCodes> getById(@PathVariable UUID id) {
		Optional<PollDto> pollOptional = pollService.getPollDtoById(id);
		if (pollOptional.isEmpty()) {
			return new GenericResponse<>(null, PollResponseCodes.NOT_FOUND);
		}
		return new GenericResponse<>(pollOptional.get());
	}

	@PostMapping
	public GenericResponse<PollDto, PollResponseCodes> create(@RequestBody CreatePollDto pollDto, Principal principal) {
		// var actor = ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
		// var actorId = ((User) actor).getId();
		PollDto dto = pollService.create(pollDto, UUID.fromString("ca5c38d6-3238-4b66-8b9a-ae4c4734842f"));
		return new GenericResponse<>(dto);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") UUID id) {
		pollService.remove(id);
	}

}
