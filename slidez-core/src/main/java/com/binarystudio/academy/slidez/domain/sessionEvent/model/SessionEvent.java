package com.binarystudio.academy.slidez.domain.sessionEvent.model;

import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "session_event")
public class SessionEvent implements Serializable {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "session_id")
	private String sessionId;

	@Column(name = "session_events")
	@Type(type = "JsonbType")
	private DomainEvent sessionEvent;

	public SessionEvent(String sessionId, DomainEvent sessionEvent) {
		this.sessionId = sessionId;
		this.sessionEvent = sessionEvent;
	}

}
