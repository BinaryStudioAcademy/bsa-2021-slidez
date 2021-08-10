package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.events.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.model.State;
import com.binarystudio.academy.slidez.domain.presentationsession.snapshots.Snapshot;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class PresentationEventStore {

	private final List<DomainEvent> events = new ArrayList<>();

	private final State state = new State();

	public List<DomainEvent> getEvents() {
		return Collections.unmodifiableList(events);
	}

	public PresentationEventStore applyEvent(DomainEvent event) {
		event.applyEvent(state);
		events.add(event);
		return this;
	}

	public Snapshot snapshot() {
		return Snapshot.getSimpleSnapshotFromState(state);
	}

	public Snapshot snapshot(Date date) {
		State stateForSpecificTime = new State();
		events.stream().filter(e -> e.getEventDate().before(date)).forEach(e -> e.applyEvent(stateForSpecificTime));

		return Snapshot.getSimpleSnapshotFromState(stateForSpecificTime);
	}

}
