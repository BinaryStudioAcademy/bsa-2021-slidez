package com.binarystudio.academy.slidez.link.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "link_id", updatable = false, nullable = false)
	private UUID linkId;

	@Column(name = "session_id")
	private Long sessionId;

	@Column(name = "link")
	private String link;

	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;

}
