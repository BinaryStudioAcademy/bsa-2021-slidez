package com.binarystudio.academy.slidez.domain.sessionEvent;

import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.sessionEvent.model.SessionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionEventService {

	private final SessionEventRepository sessionEventRepository;

	@Autowired
	public SessionEventService(SessionEventRepository sessionEventRepository) {
		this.sessionEventRepository = sessionEventRepository;
	}

	public List<SessionEvent> getSessionEventBySessionId(String link) {
		return sessionEventRepository.getSessionEventBySessionId(link);
	}

	public SessionEvent create(String sessionId, DomainEvent domainEvent) {
		SessionEvent sessionEvent = new SessionEvent(sessionId, domainEvent);
		return sessionEventRepository.save(sessionEvent);
	}

}
