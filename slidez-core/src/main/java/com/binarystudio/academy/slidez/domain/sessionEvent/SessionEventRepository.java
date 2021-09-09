package com.binarystudio.academy.slidez.domain.sessionEvent;

import com.binarystudio.academy.slidez.domain.sessionEvent.model.SessionEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SessionEventRepository extends JpaRepository<SessionEvent, UUID> {

	List<SessionEvent> getSessionEventBySessionId(String link);

}
