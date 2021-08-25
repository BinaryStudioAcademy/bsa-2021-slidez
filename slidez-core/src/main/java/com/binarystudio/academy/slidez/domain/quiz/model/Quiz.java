package com.binarystudio.academy.slidez.domain.quiz.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "quiz")
public class Quiz extends InteractiveElement {

	@Column(name = "title")
	private String title;

	@Column(name = "is_multi")
	private Boolean isMulti;

	@Column(name = "is_template")
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
	private List<QuizAnswer> quizAnswers = new ArrayList<>();

	public Quiz() {
		super(null, InteractiveElementType.QUIZ, null, null);
	}

}
