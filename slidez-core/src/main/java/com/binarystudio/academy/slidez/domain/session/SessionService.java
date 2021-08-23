package com.binarystudio.academy.slidez.domain.session;

import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.exception.SessionNotFoundException;
import com.binarystudio.academy.slidez.domain.session.mapper.SessionMapper;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import static java.time.LocalDateTime.now;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SessionService {

	private final SessionRepository sessionRepository;

	private final PresentationService presentationService;

	@Autowired
	public SessionService(SessionRepository sessionRepository, PresentationService presentationService) {
		this.sessionRepository = sessionRepository;
		this.presentationService = presentationService;
	}

	public Session get(UUID id) {
		return sessionRepository.getById(id);
	}

	@Transactional
	public Session update(SessionUpdateDto dto) throws SessionNotFoundException {
		Optional<Session> sessionFromDto = Optional.of(get(dto.getId()));
		Session session = sessionFromDto
				.orElseThrow(() -> (new SessionNotFoundException("Session with id " + dto.getId() + " not found")));
		session.setUpdatedAt(now());

		Optional.of(dto.getStatus()).ifPresent(session::setStatus);

		UUID presentationId = dto.getPresentationId();
		if (presentationId == null) {
			throw new PresentationNotFoundException("Presentation ID is null");
		}
		Optional<Presentation> presentation = presentationService.get(presentationId);
		session.setPresentation(presentation
				.orElseThrow(() -> (new SessionNotFoundException("Session with id " + dto.getId() + " not found"))));

		sessionRepository.saveAndFlush(session);
		return session;
	}

	@Transactional
	public void remove(UUID id) {
		sessionRepository.deleteById(id);
	}

	@Transactional
	public Session create(Session session) {
		LocalDateTime now = now();
		session.setCreatedAt(now);
		session.setUpdatedAt(now);
		return sessionRepository.saveAndFlush(session);
	}

	public Session createForPresentation(UUID presentationId) throws PresentationNotFoundException {
		Optional<Presentation> presentationOptional = presentationService.get(presentationId);
		if (presentationOptional.isEmpty()) {
			throw new PresentationNotFoundException(
					String.format("Not found presentation with id = %s", presentationId));
		}
		Session session = new Session(presentationOptional.get());
		return sessionRepository.save(session);
	}

	public List<Session> getAll() {
		return sessionRepository.findAll();
	}

	public Optional<SessionResponseDto> getById(UUID id) {
		Optional<Session> sessionOptional = sessionRepository.findById(id);
		SessionMapper sessionMapper = SessionMapper.INSTANCE;
		return sessionOptional.map(sessionMapper::mapSessionToSessionResponseDto);
	}

}
