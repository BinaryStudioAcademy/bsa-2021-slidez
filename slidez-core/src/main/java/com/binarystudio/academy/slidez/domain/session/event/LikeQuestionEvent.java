package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQAQuestionLike;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LikeQuestionEvent extends DomainEvent {

	private SessionQAQuestionLike questionLike;

	@Override
	public void applyEvent(State state) throws DomainException {
		state.addLikeToQuestionInQASession(questionLike);
	}

}
