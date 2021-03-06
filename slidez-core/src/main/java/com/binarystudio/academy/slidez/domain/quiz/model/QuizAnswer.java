package com.binarystudio.academy.slidez.domain.quiz.model;

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
@Table(name = "quiz_answer")
public class QuizAnswer implements Serializable {

	private static final long serialVersionUID = -5103560256231925075L;

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column
	private String title;

	@Column(name = "is_correct")
	private Boolean isCorrect;

}
