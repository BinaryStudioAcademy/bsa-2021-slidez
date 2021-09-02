package com.binarystudio.academy.slidez.domain.session;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepository extends JpaRepository<Session, UUID> {

    @Query("SELECT s FROM Session s JOIN FETCH s.link WHERE s.presentation.id = :presentationId AND s.link IS NOT NULL")
    List<Session> getActiveSessionForPresentation(UUID presentationId);
}
