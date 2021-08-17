package com.binarystudio.academy.slidez.domain.session;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponseDto;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.exception.SessionNotFoundException;
import com.binarystudio.academy.slidez.domain.session.mapper.SessionMapper;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import static java.time.LocalDateTime.now;

import com.binarystudio.academy.slidez.domain.session.model.SessionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

		Optional<UUID> presentationId = Optional.of(dto.getPresentationId());
		presentationId.map(presentationService::get).ifPresent(session::setPresentation);

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

	public Session createForPresentation(UUID presentationId) {
		LocalDateTime now = LocalDateTime.now();
		Presentation presentation = presentationService.get(presentationId);
		Session session = new Session(null, presentation, SessionStatus.ACTIVE, now, now);
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
