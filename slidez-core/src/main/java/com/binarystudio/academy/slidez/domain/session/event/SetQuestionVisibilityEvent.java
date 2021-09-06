package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQAQuestionVisibility;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SetQuestionVisibilityEvent extends DomainEvent {

	private SessionQAQuestionVisibility visibility;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.setVisibilityToQuestionInQASession(visibility);
	}

}
