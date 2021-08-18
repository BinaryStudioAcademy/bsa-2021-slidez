package com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.qasession.QASession;
import com.binarystudio.academy.slidez.domain.quiz.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "presentation_interactive_element")
public class PresentationInteractiveElement {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "type")
	private PresentationInteractiveElementType type;

	@Column(name = "slide_id")
	private String slideId;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinColumn(name = "poll_id", referencedColumnName = "id")
	private Poll poll;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinColumn(name = "quiz_id", referencedColumnName = "id")
	private Quiz quiz;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinColumn(name = "qa_id", referencedColumnName = "id")
	private QASession qaSession;

	@Column(name = "created_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime createdAt;

	@Column(name = "updated_at", columnDefinition = "TIMESTAMP")
	private LocalDateTime updatedAt;

}
