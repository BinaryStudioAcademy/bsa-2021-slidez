package com.binarystudio.academy.slidez.domain.qasession.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "qa_session")
public class QASession extends InteractiveElement {

	private static final long serialVersionUID = -3297698530180925430L;

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "interactive_element_id")
    private InteractiveElement interactiveElement;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

	@Column(name = "title")
	private String title;

    public QASession() {
        super.setType(InteractiveElementType.QASession);
    }
}
