package com.binarystudio.academy.slidez.domain.sessionEvent.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.SnapshotRequestedEvent;
import com.binarystudio.academy.slidez.domain.session.handler.AbstractDomainEventHandler;
import com.binarystudio.academy.slidez.domain.sessionEvent.SessionEventService;
import com.binarystudio.academy.slidez.domain.sessionEvent.model.SessionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class PersistDomainEventInDbHandler extends AbstractDomainEventHandler {

	private final SessionEventService sessionEventService;

	@Autowired
	public PersistDomainEventInDbHandler(SessionEventService sessionEventService) {
		this.sessionEventService = sessionEventService;
	}

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), SnapshotRequestedEvent.class)) {
			sessionEventService.create(presentationEventStore.getPresentationLink(), domainEvent);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
