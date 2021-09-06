package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.data.State;

import java.util.ArrayList;
import java.util.List;

public class SimpleSnapshot implements Snapshot {

	private final SessionQASession currentQASession;

	private final SessionInteractiveElement currentInteractiveElement;

	private final List<SessionInteractiveElement> sessionInteractiveElements;

	private final String presentationLink;

	public SimpleSnapshot(State state, String presentationLink) {
		this.currentQASession = state.getCurrentQASession();
		this.currentInteractiveElement = state.getCurrentInteractiveElement();
		this.sessionInteractiveElements = new ArrayList<>(state.getSessionInteractiveElements());
		this.presentationLink = presentationLink;
	}

	@Override
	public SessionQASession getCurrentQASession() {
		return currentQASession;
	}

	@Override
	public SessionInteractiveElement getCurrentInteractiveElement() {
		return currentInteractiveElement;
	}

	@Override
	public List<SessionInteractiveElement> getSessionInteractiveElements() {
		return sessionInteractiveElements;
	}

	@Override
	public String getPresentationLink() {
		return presentationLink;
	}

}
