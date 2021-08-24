package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public abstract class DomainEvent {

	private final UUID id = UUID.randomUUID();

	private final LocalDateTime eventDate = LocalDateTime.now();

	public abstract void applyEvent(State state) throws DomainException;

}
