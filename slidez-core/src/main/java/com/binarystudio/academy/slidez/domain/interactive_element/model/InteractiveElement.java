package com.binarystudio.academy.slidez.domain.interactive_element.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "interactive_element")
@Inheritance(strategy = InheritanceType.JOINED)
public class InteractiveElement {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private InteractiveElementType type;

	@Column(name = "slide_id", nullable = false)
	private String slideId;

	@Column(name = "owner_id", nullable = false)
	private UUID ownerId;

}
