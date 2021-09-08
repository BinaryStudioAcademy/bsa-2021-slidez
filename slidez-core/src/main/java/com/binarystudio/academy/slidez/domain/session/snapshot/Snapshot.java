package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;

import java.util.List;

public interface Snapshot {

	SessionQASession getCurrentQASession();

	SessionInteractiveElement getCurrentInteractiveElement();

	List<SessionInteractiveElement> getSessionInteractiveElements();

	String getPresentationName();

}
