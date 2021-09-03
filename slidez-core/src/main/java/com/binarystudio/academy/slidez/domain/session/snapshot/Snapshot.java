package com.binarystudio.academy.slidez.domain.session.snapshot;

import com.binarystudio.academy.slidez.domain.session.data.SessionInteractiveElement;

import java.util.List;

public interface Snapshot {

	SessionInteractiveElement getCurrentInteractiveElement();

	List<SessionInteractiveElement> getSessionInteractiveElements();

	String getPresentationLink();

}
