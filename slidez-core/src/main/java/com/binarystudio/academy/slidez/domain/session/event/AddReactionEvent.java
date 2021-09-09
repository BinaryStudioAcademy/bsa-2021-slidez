package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionReaction;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class AddReactionEvent extends DomainEvent {

	private SessionReaction reaction;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.assertInteractiveElementAdded(reaction);
	}

}
