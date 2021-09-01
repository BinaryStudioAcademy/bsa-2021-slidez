package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class StartQASessionEvent extends DomainEvent {

	private String slideId;

	private SessionQASession sessionQASession;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addInteractiveElement(sessionQASession);
	}

}
