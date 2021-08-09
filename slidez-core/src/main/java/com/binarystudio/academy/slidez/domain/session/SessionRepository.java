package com.binarystudio.academy.slidez.domain.session;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.dto.SessionUpdateDto;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface SessionRepository extends JpaRepository<Session, UUID> {

    @Transactional
    @Modifying
    @Query("UPDATE Session s SET s.presentation = :#{#dto.presentation}, " +
            "s.status = :#{#dto.sessionStatus}, "+
            "s.updatedAt = :#{#dto.updatedAt} " +
            "WHERE s.id = :#{#dto.id}")
    void update(SessionUpdateDto dto);
}