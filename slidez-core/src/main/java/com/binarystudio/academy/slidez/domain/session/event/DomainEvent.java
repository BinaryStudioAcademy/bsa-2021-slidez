package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.State;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({ @JsonSubTypes.Type(value = StartPollEvent.class, name = "StartPollEvent"),
		@JsonSubTypes.Type(value = SnapshotRequestedEvent.class, name = "SnapshotRequestedEvent"),
		@JsonSubTypes.Type(value = AnswerPollEvent.class, name = "AnswerPollEvent"),
		@JsonSubTypes.Type(value = AskQuestionEvent.class, name = "AskQuestionEvent"),
		@JsonSubTypes.Type(value = AddReactionEvent.class, name = "AddReactionEvent"),
		@JsonSubTypes.Type(value = AnswerQuizEvent.class, name = "AnswerQuizEvent"),
		@JsonSubTypes.Type(value = StartQASessionEvent.class, name = "StartQASessionEvent"),
		@JsonSubTypes.Type(value = StartQuizEvent.class, name = "StartQuizEvent") })
public abstract class DomainEvent {

	private final UUID id = UUID.randomUUID();

	private final LocalDateTime eventDate = LocalDateTime.now();

	public abstract void applyEvent(State state) throws DomainException;

}
