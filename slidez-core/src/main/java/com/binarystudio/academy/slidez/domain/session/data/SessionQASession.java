package com.binarystudio.academy.slidez.domain.session.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class SessionQASession extends SessionInteractiveElement {

	private String title;

	private List<SessionQAQuestion> questions = new ArrayList<>();

	public void addQuestion(SessionQAQuestion sessionQAQuestion) {
		questions.add(sessionQAQuestion);
	}

}
