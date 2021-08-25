package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class StartPollEvent extends DomainEvent {

	private UUID pollId;

	private SessionPoll sessionPoll;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addInteractiveElement(sessionPoll);
	}

}
