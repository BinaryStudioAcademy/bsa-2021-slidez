package com.binarystudio.academy.slidez.app;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/sessions")
public class SessionController {

	@Autowired
	SessionService sessionService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UUID save(@RequestBody Session session) {
		Session createdSesion = sessionService.create(session);
		UUID id = createdSesion.getId();
		return id;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Session save(@RequestBody SessionUpdateDto dto) {
		return sessionService.update(dto);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.OK)
	public void delete(@RequestBody UUID id) {
		sessionService.remove(id);
	}

	@GetMapping


}
