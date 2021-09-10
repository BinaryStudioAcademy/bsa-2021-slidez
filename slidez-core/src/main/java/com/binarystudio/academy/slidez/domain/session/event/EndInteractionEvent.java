package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.State;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class EndInteractionEvent extends DomainEvent {

	@JsonIgnore
	private boolean ended;

	@Override
	public void applyEvent(State state) throws DomainException {
		this.ended = state.endInteraction();
	}

}
