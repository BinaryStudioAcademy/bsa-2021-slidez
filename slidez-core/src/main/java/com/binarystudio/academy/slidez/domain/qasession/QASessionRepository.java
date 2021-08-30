package com.binarystudio.academy.slidez.domain.qasession;

import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QASessionRepository extends JpaRepository<QASession, UUID> {

}
