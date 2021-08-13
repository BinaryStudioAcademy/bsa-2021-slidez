package com.binarystudio.academy.slidez.domain.session;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, UUID> {

}
