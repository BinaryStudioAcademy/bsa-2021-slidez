package com.binarystudio.academy.slidez.domain.session.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.*;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
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
@Table(name = "sessions")
public class Session {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinColumn(name = "presentation_id", referencedColumnName = "id")
	private Presentation presentation;

	@Column(name = "status")
	@Enumerated(EnumType.ORDINAL)
	private SessionStatus status;

	@Column(name = "created_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime createdAt;

	@Column(name = "updated_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime updatedAt;

}
