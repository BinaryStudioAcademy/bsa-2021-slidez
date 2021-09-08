package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Objects;

@Data
@EqualsAndHashCode(callSuper = true)
public class DisplayQASessionEvent extends DomainEvent {

	private String slideId;

	private SessionQASession currentQASession;

	@Override
	public void applyEvent(State state) throws DomainException {
		SessionQASession qaSession = state.getCurrentQASession();
		if (!Objects.equals(qaSession.getSlideId(), slideId)) {
			this.currentQASession = qaSession;
		}
	}

}
