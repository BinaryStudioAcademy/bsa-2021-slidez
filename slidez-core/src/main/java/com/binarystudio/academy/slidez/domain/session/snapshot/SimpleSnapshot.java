package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class SimpleSnapshot implements Snapshot {

	@Getter
	private final List<SessionInteractiveElement> sessionInteractiveElements;

	public SimpleSnapshot(List<SessionInteractiveElement> sessionInteractiveElements) {
		this.sessionInteractiveElements = new ArrayList<>(sessionInteractiveElements);
	}

}
