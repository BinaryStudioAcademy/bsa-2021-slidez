package com.binarystudio.academy.slidez.domain.quiz.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quiz")
public class Quiz extends InteractiveElement {

	private static final long serialVersionUID = 90029876168982L;

	@Column(name = "title")
	private String title;

	@Column(name = "is_multi")
	private Boolean isMulti;

	@Column(name = "is_template")
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
	private List<QuizAnswer> quizAnswers;

}
