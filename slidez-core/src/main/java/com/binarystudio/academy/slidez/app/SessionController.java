package com.binarystudio.academy.slidez.app;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
	@ResponseStatus(HttpStatus.CREATED)
	public UUID save(@RequestBody Session session) {
		Session createdSession = sessionService.create(session);
		UUID id = createdSession.getId();
		return id;
	}

	@PostMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public UUID update(@RequestBody SessionUpdateDto dto) {
		Session session = sessionService.update(dto);
		return session.getId();
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void delete(@PathVariable("id") UUID id) {
		sessionService.remove(id);
	}

	@GetMapping
	public List<Session> all() {
		return sessionService.getAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") UUID id) {
		if (id == null) {
			return new ResponseEntity<>("Invalid session ID", HttpStatus.BAD_REQUEST);
		}

		Optional<Session> sessionOptional = this.sessionService.getById(id);
		if (sessionOptional.isEmpty()) {
			return new ResponseEntity<>("Session not found.", HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(sessionOptional, HttpStatus.OK);
	}

}