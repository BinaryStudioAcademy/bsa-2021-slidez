package com.binarystudio.academy.slidez.domain.presentationsession.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Getter
public abstract class DomainEvent {

	private final UUID id = UUID.randomUUID();

	private final Date eventDate = new Date();

	public abstract void applyEvent(State state) throws DomainException;

}
