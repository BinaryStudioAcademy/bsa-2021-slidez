package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class StartPollEvent extends DomainEvent {

	private UUID id;

	private SessionPoll sessionPoll;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addInteractiveElement(sessionPoll);
	}

}
