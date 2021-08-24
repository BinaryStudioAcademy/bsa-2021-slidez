package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

public abstract class AbstractDomainEventHandler implements DomainEventHandler {

	private volatile DomainEventHandler next;

	@Override
	public DomainEventHandler setNext(DomainEventHandler next) {
		this.next = next;
		return this;
	}

	@Override
	public GenericResponse<Object, ? extends Enum<?>> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		final DomainEventHandler nextCopy = next;
		if (nextCopy != null) {
			nextCopy.handle(domainEvent, presentationEventStore);
		}
		return null;
	}

}
