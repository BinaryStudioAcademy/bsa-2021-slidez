package com.binarystudio.academy.slidez.domain.presentation_session.snapshot;

import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class SimpleSnapshot implements Snapshot {

	@Getter
	private final List<SessionPoll> sessionPolls;

	public SimpleSnapshot(List<SessionPoll> sessionPolls) {
		this.sessionPolls = new ArrayList<>(sessionPolls);
	}

}
