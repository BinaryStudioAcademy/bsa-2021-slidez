package com.binarystudio.academy.slidez.domain.session;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import com.binarystudio.academy.slidez.domain.session.model.SessionStatus;
import static java.time.LocalDateTime.now;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;


    @Autowired
    private PresentationService presentationService;

    public Session add(Presentation presentation, SessionStatus status) {
        LocalDateTime now = now();
        Session session = new Session(null, presentation, status, now, now);
        return sessionRepository.save(session);
    }

    public Session get(UUID id) {
        return sessionRepository.getById(id);
    }

    public Session update(SessionUpdateDto dto) {
        Session session = get(dto.getId());
        if (session == null) {
           throw new EntityNotFoundException("Sessio with id " + dto.getId() +  " not found");
        }
        session.setUpdatedAt(now());

        if (dto.getStatus() != null) {
            session.setStatus(dto.getStatus());
        }

        UUID presentationId = dto.getPresentationId();
        if (presentationId != null) {
            Presentation presentation = presentationService.get(presentationId);
            if (presentation != null) {
                session.setPresentation(presentation);
            }
        }

        sessionRepository.saveAndFlush(session);
        return session;
    }

    public void remove(UUID id) {
        sessionRepository.deleteById(id);
    }

    public Session create(Session session) {
        LocalDateTime now = now();
        session.setCreatedAt(now);
        session.setUpdatedAt(now);
        return sessionRepository.saveAndFlush(session);
    }

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    public Optional<Session> getById(UUID id) {
        return sessionRepository.findById(id);
    }
}
