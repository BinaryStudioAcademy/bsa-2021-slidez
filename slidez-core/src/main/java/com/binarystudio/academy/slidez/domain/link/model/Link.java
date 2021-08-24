package com.binarystudio.academy.slidez.domain.link.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.*;

import com.binarystudio.academy.slidez.domain.session.model.Session;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", unique = true)
	private UUID id;

	@Column(name = "code")
	private String code;

	@Column(name = "leased_until")
	private LocalDateTime leasedUntil;

	@OneToOne(mappedBy = "link")
	private Session session;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	public Link(String code) {
		LocalDateTime now = LocalDateTime.now();
		this.code = code;
		this.createdAt = now;
		this.updatedAt = now;
	}

}
