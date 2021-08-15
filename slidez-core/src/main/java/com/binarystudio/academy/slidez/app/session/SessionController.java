package com.binarystudio.academy.slidez.app.session;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/sessions")
public class SessionController {

	private final SessionService sessionService;

	@Autowired
	public SessionController(SessionService sessionService) {
		this.sessionService = sessionService;
	}

	@PostMapping("/create")
	public GenericResponse<UUID, SessionResponseCodes> save(@RequestBody Session session) {
		Session createdSession = sessionService.create(session);
		return new GenericResponse<>(createdSession.getId());
	}

	@PostMapping("/update")
	public GenericResponse<UUID, SessionResponseCodes> update(@RequestBody SessionUpdateDto dto) {
		Session session = sessionService.update(dto);
		return new GenericResponse<>(session.getId());
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") UUID id) {
		sessionService.remove(id);
	}

	@GetMapping
	public GenericResponse<List<Session>, SessionResponseCodes> all() {
		return new GenericResponse<>(sessionService.getAll());
	}

	@GetMapping("/{id}")
	public GenericResponse<SessionResponseDto, SessionResponseCodes> getById(@PathVariable("id") UUID id) {
		Optional<SessionResponseDto> sessionOptional = sessionService.getById(id);
		if (sessionOptional.isEmpty()) {
			return new GenericResponse<>(null, SessionResponseCodes.NOT_FOUND);
		}
		return new GenericResponse<>(sessionOptional.get());
	}

}
