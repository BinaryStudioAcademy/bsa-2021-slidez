package com.binarystudio.academy.slidez.domain.session;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import com.binarystudio.academy.slidez.domain.session.model.SessionStatus;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public Session add(Presentation presentation, SessionStatus status) {
        LocalDateTime now = LocalDateTime.now();
        Session session = new Session(null, presentation, status, now, now);
        return sessionRepository.save(session);
    }

    public Session get(UUID id) {
        return sessionRepository.getById(id);
    }

    public Session update(SessionUpdateDto dto) {
        sessionRepository.update(dto);
        return sessionRepository.getById(dto.getId());
    }

    public void remove(UUID id) {
        sessionRepository.deleteById(id);
    }

    public Session create(Session session) {
        LocalDateTime now = LocalDateTime.now();
        session.setCreatedAt(now);
        session.setUpdatedAt(now);
        return sessionRepository.save(session);
    }

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }
}
