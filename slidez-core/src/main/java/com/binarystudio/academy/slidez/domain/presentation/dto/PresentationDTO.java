package com.binarystudio.academy.slidez.domain.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PresentationDTO {

    private UUID id;

    private String presentationName;

    private String updatedAt;

}
