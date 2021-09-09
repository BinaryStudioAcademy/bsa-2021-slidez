package com.binarystudio.academy.slidez.domain.qasession.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQASessionDto {

	// THIS IS ACTUALLY A PRESENTATION LINK
	private String presentationId;

    private String presentationName;

    private String slideId;

    private String title;

}
