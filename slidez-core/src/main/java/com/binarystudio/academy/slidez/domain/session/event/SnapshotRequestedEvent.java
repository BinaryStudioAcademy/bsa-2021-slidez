package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.State;

public class SnapshotRequestedEvent extends DomainEvent {

	@Override
	public void applyEvent(State state) throws DomainException {

	}

}
