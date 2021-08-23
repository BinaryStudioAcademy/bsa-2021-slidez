package com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "presentation_interactive_element")
public class PresentationInteractiveElement {

	private static final String SLIDE_ID_PREFIX = "slidez_";

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "type")
	private PresentationInteractiveElementType type;

	@Column(name = "slide_id")
	private String slideId;

	@CreationTimestamp
	@Column(name = "created_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime updatedAt;

	public static String generatePresentationSlideId(UUID desiredId) {
		return SLIDE_ID_PREFIX + desiredId.toString();
	}

}
