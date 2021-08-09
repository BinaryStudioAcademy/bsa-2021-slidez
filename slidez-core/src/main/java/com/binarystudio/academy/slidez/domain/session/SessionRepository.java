package com.binarystudio.academy.slidez.domain.session;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {

    @Modifying
    @Query("UPDATE sessions s SET s.presentation_id = :#{#dto.presentation.id} " +
           // "s.session_status = :#{#dto.sessionStatus} "+
            "s.updated_at = :#{#dto.updatedAt} " +
            "WHERE s.id = :#{#dto.id}")
    void update(@Param(value = "dto") SessionUpdateDto dto);
}