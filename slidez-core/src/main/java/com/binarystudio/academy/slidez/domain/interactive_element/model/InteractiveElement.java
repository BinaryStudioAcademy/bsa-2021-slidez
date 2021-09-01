package com.binarystudio.academy.slidez.domain.interactive_element.model;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
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
@Table(name = "interactive_element")
public class InteractiveElement implements Serializable {

	private static final long serialVersionUID = -9030801668124685221L;

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private InteractiveElementType type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "presentation_id")
	private Presentation presentation;

	@OneToOne(mappedBy = "interactiveElement")
	private Poll poll;

	@OneToOne(mappedBy = "interactiveElement")
	private Quiz quiz;

	@OneToOne(mappedBy = "interactiveElement")
	private QASession qaSession;

	@Column(name = "slide_id", nullable = false)
	private String slideId;

}
