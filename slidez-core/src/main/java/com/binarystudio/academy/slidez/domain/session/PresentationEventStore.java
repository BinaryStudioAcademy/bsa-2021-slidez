package com.binarystudio.academy.slidez.domain.session;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.data.State;
import com.binarystudio.academy.slidez.domain.session.snapshot.Snapshot;

import javax.annotation.concurrent.GuardedBy;
import javax.annotation.concurrent.ThreadSafe;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Class supports external synchronization on "this" instance
 */
@ThreadSafe
public class PresentationEventStore {

	@GuardedBy("this")
	private final List<DomainEvent> events = new ArrayList<>();

	@GuardedBy("this")
	private final State state = new State();

	@GuardedBy("Immutability of java.lang.String + field is final + object is constructed without letting 'this' to escape")
	private final String presentationLink;

	public PresentationEventStore(String presentationLink) {
		this.presentationLink = presentationLink;
	}

	public String getPresentationLink() {
		return presentationLink;
	}

	public synchronized List<DomainEvent> getEvents() {
		return Collections.unmodifiableList(events);
	}

	public PresentationEventStore applyEvent(DomainEvent event) throws DomainException {
		synchronized (this) {
			event.applyEvent(state);
			events.add(event);
		}
		return this;
	}

	public synchronized Snapshot snapshot() {
		return Snapshot.getSimpleSnapshotFromState(state, presentationLink);
	}

	public Snapshot snapshot(LocalDateTime localDateTime) throws DomainException {
		State stateForSpecificTime = new State();
		synchronized (this) {
			events.stream().filter(e -> e.getEventDate().isBefore(localDateTime))
					.forEach(e -> e.applyEvent(stateForSpecificTime));
		}
		return Snapshot.getSimpleSnapshotFromState(stateForSpecificTime, presentationLink);
	}

}
