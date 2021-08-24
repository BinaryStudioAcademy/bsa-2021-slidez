package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.event.PollCreatedEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll")
public class Poll extends InteractiveElement {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "is_multi", nullable = false)
	private Boolean isMulti;

	@Column(name = "is_template", nullable = false)
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "poll_id", referencedColumnName = "id", nullable = false)
	private List<PollOption> options;

	@Override
	public void supplyEvent(PresentationEventStore store) {
		SessionPoll sessionPoll = new SessionPoll(id, title);
		DomainEvent domainEvent = new PollCreatedEvent(sessionPoll);
		store.applyEvent(domainEvent);
	}

}
