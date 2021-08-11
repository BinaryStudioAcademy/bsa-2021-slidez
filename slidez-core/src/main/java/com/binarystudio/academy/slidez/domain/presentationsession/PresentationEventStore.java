package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import com.binarystudio.academy.slidez.domain.presentationsession.snapshot.Snapshot;
import org.springframework.stereotype.Component;

import javax.annotation.concurrent.GuardedBy;
import javax.annotation.concurrent.ThreadSafe;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Class supports external synchronization on "this" instance
 */
@Component
@ThreadSafe
public class PresentationEventStore {

	@GuardedBy("this")
	private final List<DomainEvent> events = new ArrayList<>();

	@GuardedBy("this")
	private final State state = new State();

	public synchronized List<DomainEvent> getEvents() {
		return Collections.unmodifiableList(events);
	}

	public PresentationEventStore applyEvent(DomainEvent event) {
		synchronized (this) {
			event.applyEvent(state);
			events.add(event);
		}
		return this;
	}

	public synchronized Snapshot snapshot() {
		return Snapshot.getSimpleSnapshotFromState(state);
	}

	public Snapshot snapshot(Date date) {
		State stateForSpecificTime = new State();
		synchronized (this) {
			events.stream().filter(e -> e.getEventDate().before(date)).forEach(e -> e.applyEvent(stateForSpecificTime));
		}
		return Snapshot.getSimpleSnapshotFromState(stateForSpecificTime);
	}

}
