package com.binarystudio.academy.slidez.domain.session.data;

import lombok.Data;

import java.util.UUID;

@Data
public class SessionQAQuestionVisibility {

	private UUID questionId;

	private boolean isVisible;

}
