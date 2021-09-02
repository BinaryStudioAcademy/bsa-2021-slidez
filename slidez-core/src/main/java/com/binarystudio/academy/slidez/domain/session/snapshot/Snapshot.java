package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import com.binarystudio.academy.slidez.domain.session.data.State;

import java.util.List;

public interface Snapshot {

	List<SessionInteractiveElement> getSessionInteractiveElements();

    String getPresentationLink();

	static SimpleSnapshot getSimpleSnapshotFromState(State state, String presentationLink) {
		return new SimpleSnapshot(state.getSessionInteractiveElements(), presentationLink);
	}

}
