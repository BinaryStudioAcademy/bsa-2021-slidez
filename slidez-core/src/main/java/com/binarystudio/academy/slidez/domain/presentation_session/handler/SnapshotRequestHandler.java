package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.event.SnapshotRequestedEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.snapshot.Snapshot;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

import java.util.Objects;

public class SnapshotRequestHandler extends AbstractDomainEventHandler {

    @Override
    public GenericResponse<Object, ? extends Enum<?>> handle(DomainEvent domainEvent,
                                                             PresentationEventStore presentationEventStore) {
        if (Objects.equals(domainEvent.getClass(), SnapshotRequestedEvent.class)) {
            Snapshot snapshot = presentationEventStore.snapshot();
            super.handle(domainEvent, presentationEventStore);
            return new GenericResponse<>(snapshot);
        }
        return super.handle(domainEvent, presentationEventStore);
    }
}
