package com.binarystudio.academy.slidez.domain.qasession;

import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface QASessionRepository extends JpaRepository<QASession, UUID> {

	@Query("SELECT qs FROM QASession qs WHERE qs.interactiveElement.slideId = :slideId")
	Optional<QASession> getBySlideId(String slideId);

}
