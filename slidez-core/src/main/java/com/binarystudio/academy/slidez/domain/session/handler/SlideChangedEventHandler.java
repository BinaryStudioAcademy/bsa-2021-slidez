package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.interactive_element.InteractiveElementRepository;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.event.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class SlideChangedEventHandler extends AbstractDomainEventHandler {

	private final InteractiveElementRepository interactiveElementRepository;

	@Autowired
	public SlideChangedEventHandler(InteractiveElementRepository interactiveElementRepository) {
		this.interactiveElementRepository = interactiveElementRepository;
	}

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), SlideChangedEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		final SlideChangedEvent slideChangedEvent = (SlideChangedEvent) domainEvent;
		Optional<InteractiveElement> interactiveElement = interactiveElementRepository
				.findBySlideId(slideChangedEvent.getSlideId());
		if (interactiveElement.isPresent()) {
			Optional<DomainEvent> startEvent = getStartEventByType(interactiveElement.get());
			if (startEvent.isPresent()) {
				return super.handle(startEvent.get(), presentationEventStore);
			}
		}
		return super.handle(domainEvent, presentationEventStore);
	}

	private Optional<DomainEvent> getStartEventByType(InteractiveElement element) {
		switch (element.getType()) {
		case POLL:
			StartPollEvent startPollEvent = new StartPollEvent();
			startPollEvent.setSlideId(element.getSlideId());
			return Optional.of(startPollEvent);
		case QASession:
			DisplayQASessionEvent displayQASessionEvent = new DisplayQASessionEvent();
			displayQASessionEvent.setSlideId(element.getSlideId());
			return Optional.of(displayQASessionEvent);
		}
		return Optional.empty();
	}

}
