package com.binarystudio.academy.slidez.domain.poll.model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll_answer")
public class PollOption implements Serializable {

	private static final long serialVersionUID = 637849887541003L;

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "title", nullable = false)
	private String title;

	public PollOption(String title) {
		this.title = title;
	}

}
