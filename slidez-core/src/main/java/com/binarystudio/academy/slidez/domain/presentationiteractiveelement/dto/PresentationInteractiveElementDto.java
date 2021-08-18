package com.binarystudio.academy.slidez.domain.presentationiteractiveelement.dto;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElementType;
import com.binarystudio.academy.slidez.domain.qasession.QASession;
import com.binarystudio.academy.slidez.domain.quiz.Quiz;
import lombok.Data;

import java.util.UUID;

@Data
public class PresentationInteractiveElementDto {

	private UUID id;
    private PresentationInteractiveElementType type;
    private String slideId;
    private Poll poll;
    private Quiz quiz;
    private QASession qaSession;

}
