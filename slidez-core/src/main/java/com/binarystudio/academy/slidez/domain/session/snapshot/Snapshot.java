package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import com.binarystudio.academy.slidez.domain.session.data.State;

import java.util.List;

public interface Snapshot {

	List<SessionInteractiveElement> getSessionInteractiveElements();

	static SimpleSnapshot getSimpleSnapshotFromState(State state) {
		return new SimpleSnapshot(state.getSessionInteractiveElements());
	}

}
