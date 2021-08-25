package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.stereotype.Component;

@Component
/**
 * Class only adds given event to the event store
 */
public class DefaultEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<Object, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		presentationEventStore.applyEvent(domainEvent);
		return super.handle(domainEvent, presentationEventStore);
	}

}
