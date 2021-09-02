package com.binarystudio.academy.slidez.domain.presentation.dto;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PresentationSessionDTO {
    private UUID presentationId;
    private String presentationName;
    private String code;

    public static PresentationSessionDTO of(Presentation presentation, Session session){
        return new PresentationSessionDTO(presentation.getId(), presentation.getName(), session.getLink().getCode());
    }
}
