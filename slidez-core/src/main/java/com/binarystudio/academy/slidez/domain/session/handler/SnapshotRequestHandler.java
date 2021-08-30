package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.SnapshotRequestedEvent;
import com.binarystudio.academy.slidez.domain.session.snapshot.Snapshot;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class SnapshotRequestHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (Objects.equals(domainEvent.getClass(), SnapshotRequestedEvent.class)) {
			// Don't need to invoke super - we don't need to register this event in store
			Snapshot snapshot = presentationEventStore.snapshot();
			SessionResponse sessionResponse = new SessionResponse(ResponseType.SNAPSHOT, snapshot);
			return new GenericResponse<>(sessionResponse);
		}
		return super.handle(domainEvent, presentationEventStore);
	}

}
