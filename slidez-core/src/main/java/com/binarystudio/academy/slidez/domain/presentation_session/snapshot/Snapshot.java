package com.binarystudio.academy.slidez.domain.presentation_session.snapshot;

import com.binarystudio.academy.slidez.domain.presentation_session.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation_session.model.State;

import java.util.List;

public interface Snapshot {

	List<Poll> getPolls();

	static SimpleSnapshot getSimpleSnapshotFromState(State state) {
		return new SimpleSnapshot(state.getPolls());
	}

}
