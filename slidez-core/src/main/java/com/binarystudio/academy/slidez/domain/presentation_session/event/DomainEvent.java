package com.binarystudio.academy.slidez.domain.presentation_session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({ @JsonSubTypes.Type(value = StartPollEvent.class, name = "StartPollEvent"),
		@JsonSubTypes.Type(value = SnapshotRequestedEvent.class, name = "SnapshotRequestedEvent"),
		@JsonSubTypes.Type(value = AnswerPollEvent.class, name = "AnswerPollEvent") })
public abstract class DomainEvent {

	private final UUID id = UUID.randomUUID();

	private final LocalDateTime eventDate = LocalDateTime.now();

	public abstract void applyEvent(State state) throws DomainException;

}
