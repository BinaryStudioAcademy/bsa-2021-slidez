package com.binarystudio.academy.slidez.room.snapshots;

import com.binarystudio.academy.slidez.room.state.Poll;
import com.binarystudio.academy.slidez.room.state.State;

import java.util.List;

public interface Snapshot {

	List<Poll> getPolls();

	static SimpleSnapshot getSimpleSnapshotFromState(State state) {
		return new SimpleSnapshot(state.getPolls());
	}

}
