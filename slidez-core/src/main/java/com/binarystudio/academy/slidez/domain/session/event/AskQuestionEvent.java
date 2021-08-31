package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQAQuestion;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AskQuestionEvent extends DomainEvent {

	private SessionQAQuestion question;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addQuestionToQASession(question);
	}

}
