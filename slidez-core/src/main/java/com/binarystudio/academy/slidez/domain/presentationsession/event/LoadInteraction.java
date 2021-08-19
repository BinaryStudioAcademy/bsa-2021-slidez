package com.binarystudio.academy.slidez.domain.presentationsession.event;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class LoadInteraction extends DomainEvent {

	private final UUID pollId;

	@Override
	public void applyEvent(State state) {
		state.loadInteraction(pollId);
	}

}
