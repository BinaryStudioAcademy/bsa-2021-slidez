package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.dto.SessionResponse;
import com.binarystudio.academy.slidez.domain.session.enums.ResponseType;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.LikeQuestionEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class LikeQuestionEventHandler extends AbstractDomainEventHandler {

	@Override
	public GenericResponse<SessionResponse, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		if (!Objects.equals(domainEvent.getClass(), LikeQuestionEvent.class)) {
			return super.handle(domainEvent, presentationEventStore);
		}
		LikeQuestionEvent event = (LikeQuestionEvent) domainEvent;
		super.handle(event, presentationEventStore);
		SessionResponse out = new SessionResponse(ResponseType.LIKED_QUESTION, event.getQuestionLike());
		return new GenericResponse<>(out);
	}

}
