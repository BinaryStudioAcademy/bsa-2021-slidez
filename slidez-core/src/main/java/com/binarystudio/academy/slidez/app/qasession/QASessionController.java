package com.binarystudio.academy.slidez.app.qasession;

import com.binarystudio.academy.slidez.domain.qasession.QASessionService;
import com.binarystudio.academy.slidez.domain.qasession.dto.CreateQASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.dto.QASessionDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("${v1API}/qa-sessions")
public class QASessionController {

	private final QASessionService qaSessionService;

	@Autowired
	public QASessionController(QASessionService qaSessionService) {
		this.qaSessionService = qaSessionService;
	}

	@PostMapping("/new")
	public GenericResponse<QASessionDto, QASessionResponseCodes> create(@RequestBody CreateQASessionDto dto,
			Principal principal) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) usernamePasswordAuthenticationToken.getPrincipal();
		QASessionDto qaSessionDto = qaSessionService.create(dto, user);
		return new GenericResponse<>(qaSessionDto);
	}

}
