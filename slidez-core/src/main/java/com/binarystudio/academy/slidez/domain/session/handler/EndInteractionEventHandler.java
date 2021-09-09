package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.interactive_element.InteractiveElementRepository;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.EndInteractionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class EndInteractionEventHandler extends AbstractDomainEventHandler {

	private final InteractiveElementRepository interactiveElementRepository;

	@Autowired
	public EndInteractionEventHandler(InteractiveElementRepository interactiveElementRepository) {
		this.interactiveElementRepository = interactiveElementRepository;
	}

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), EndInteractionEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		EndInteractionEvent endInteractionEvent = (EndInteractionEvent) domainEvent;
		Optional<InteractiveElement> interactiveElement = interactiveElementRepository
				.findBySlideId(endInteractionEvent.getSlideId());
		if (interactiveElement.isPresent()) {
			setInteractionClass(endInteractionEvent, interactiveElement.get());
			final GenericResponse<SessionResponse, SessionResponseCodes> defaultResult = super.handle(
					endInteractionEvent, presentationEventStore);
			if (endInteractionEvent.isEnded()) {
				SessionResponse sessionResponse = new SessionResponse(ResponseType.END_CURRENT_INTERACTION,
						endInteractionEvent);
				return new GenericResponse<>(sessionResponse);
			}
			return defaultResult;
		}
		return super.handle(endInteractionEvent, presentationEventStore);
	}

	private void setInteractionClass(EndInteractionEvent target, InteractiveElement element) {
		switch (element.getType()) {
		case POLL:
			target.setInteractionClass(SessionPoll.class);
		}
	}

}
