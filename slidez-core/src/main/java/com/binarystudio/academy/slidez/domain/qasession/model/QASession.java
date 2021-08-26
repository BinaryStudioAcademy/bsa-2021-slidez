package com.binarystudio.academy.slidez.domain.qasession.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "qa_session")
public class QASession extends InteractiveElement {

	private static final long serialVersionUID = -3297698530180925430L;

	@Column(name = "title")
	private String title;

}
