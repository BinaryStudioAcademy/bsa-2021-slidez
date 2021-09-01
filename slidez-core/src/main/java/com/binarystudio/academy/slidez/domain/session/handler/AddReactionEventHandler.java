package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionReaction;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.AddReactionEvent;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AddReactionEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), AddReactionEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		super.handle(domainEvent, presentationEventStore);
		AddReactionEvent event = (AddReactionEvent) domainEvent;
		SessionReaction reaction = event.getReaction();
		SessionResponse out = new SessionResponse(ResponseType.ADDED_REACTION, reaction);
		return new GenericResponse<>(out);
	}

}
