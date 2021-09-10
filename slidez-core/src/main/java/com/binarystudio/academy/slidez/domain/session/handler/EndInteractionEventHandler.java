package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.EndInteractionEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class EndInteractionEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), EndInteractionEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		EndInteractionEvent endInteractionEvent = (EndInteractionEvent) domainEvent;
		final GenericResponse<SessionResponse, SessionResponseCodes> defaultResult = super.handle(endInteractionEvent,
				presentationEventStore);
		if (endInteractionEvent.isEnded()) {
			SessionResponse sessionResponse = new SessionResponse(ResponseType.END_CURRENT_INTERACTION,
					endInteractionEvent);
			return new GenericResponse<>(sessionResponse);
		}
		return defaultResult;
	}

}
