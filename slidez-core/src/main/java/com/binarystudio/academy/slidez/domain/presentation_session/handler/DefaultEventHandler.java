package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

public class DefaultEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<Object, ? extends Enum<?>> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
	    presentationEventStore.applyEvent(domainEvent);
		return null;
	}

}
