package com.binarystudio.academy.slidez.domain.presentationsession.snapshots;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;

import java.util.List;

public interface Snapshot {

	List<Poll> getPolls();

	static SimpleSnapshot getSimpleSnapshotFromState(State state) {
		return new SimpleSnapshot(state.getPolls());
	}

}
