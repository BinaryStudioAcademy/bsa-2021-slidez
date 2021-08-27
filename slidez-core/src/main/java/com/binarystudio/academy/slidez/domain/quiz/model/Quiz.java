package com.binarystudio.academy.slidez.domain.quiz.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "quiz")
public class Quiz extends InteractiveElement {

	private static final long serialVersionUID = 90029876168982L;

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "interactive_element_id")
    private InteractiveElement interactiveElement;

	@Column(name = "title")
	private String title;

	@Column(name = "is_multi")
	private Boolean isMulti;

	@Column(name = "is_template")
	private Boolean isTemplate;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
	private List<QuizAnswer> quizAnswers = new ArrayList<>();

    public Quiz() {
        super.setType(InteractiveElementType.QUIZ);
    }
}
