package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.app.presentationsession.PresentationSessionResponseCodes;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

public interface DomainEventHandler {

	DomainEventHandler setNext(DomainEventHandler next);

	GenericResponse<Object, PresentationSessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore);

}
