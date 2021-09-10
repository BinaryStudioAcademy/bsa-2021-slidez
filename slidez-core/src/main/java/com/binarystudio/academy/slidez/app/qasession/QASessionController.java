package com.binarystudio.academy.slidez.app.qasession;

import com.binarystudio.academy.slidez.domain.qasession.QASessionService;
import com.binarystudio.academy.slidez.domain.qasession.dto.CreateQASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.dto.QASessionDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/qa-sessions")
public class QASessionController {

	private final QASessionService qaSessionService;

	@Autowired
	public QASessionController(QASessionService qaSessionService) {
		this.qaSessionService = qaSessionService;
	}

	@GetMapping("/{id}")
	public GenericResponse<QASessionDto, QASessionResponseCodes> getById(@PathVariable UUID id) {
		Optional<QASessionDto> qaSessionOptional = qaSessionService.getQASessionDtoById(id);
		if (qaSessionOptional.isEmpty()) {
			return new GenericResponse<>(null, QASessionResponseCodes.NOT_FOUND);
		}
		return new GenericResponse<>(qaSessionOptional.get());
	}

	@PostMapping("/new")
	public GenericResponse<QASessionDto, QASessionResponseCodes> create(@RequestBody CreateQASessionDto dto,
			Principal principal) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) usernamePasswordAuthenticationToken.getPrincipal();
		QASessionDto qaSessionDto = qaSessionService.create(dto, user);
		return new GenericResponse<>(qaSessionDto);
	}

	@DeleteMapping("/{slide-id}")
	public void delete(@PathVariable("slide-id") String slideId) {
		qaSessionService.remove(slideId);
	}

}
