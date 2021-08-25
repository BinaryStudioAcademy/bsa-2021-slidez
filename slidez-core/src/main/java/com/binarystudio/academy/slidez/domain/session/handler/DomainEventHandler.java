package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

public interface DomainEventHandler {

	DomainEventHandler setNext(DomainEventHandler next);

	GenericResponse<Object, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore);

}
