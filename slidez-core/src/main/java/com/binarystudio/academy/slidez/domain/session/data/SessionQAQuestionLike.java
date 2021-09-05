package com.binarystudio.academy.slidez.domain.session.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionQAQuestionLike {

	private UUID questionId;

	private UUID participantId;

}
