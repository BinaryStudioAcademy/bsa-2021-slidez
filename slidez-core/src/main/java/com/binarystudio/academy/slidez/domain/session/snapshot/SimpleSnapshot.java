package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SimpleSnapshot implements Snapshot {

	private final List<SessionInteractiveElement> sessionInteractiveElements;

    private final String presentationLink;

	public SimpleSnapshot(List<SessionInteractiveElement> sessionInteractiveElements, String presentationLink) {
		this.sessionInteractiveElements = new ArrayList<>(sessionInteractiveElements);
        this.presentationLink = presentationLink;
	}

}
