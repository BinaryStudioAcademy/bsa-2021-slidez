package com.binarystudio.academy.slidez.domain.qasession.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "qa_session")
public class QASession extends InteractiveElement {

	@Column(name = "title")
	private String title;

	public QASession() {
		super(null, InteractiveElementType.QASession, null, null);
	}

}
