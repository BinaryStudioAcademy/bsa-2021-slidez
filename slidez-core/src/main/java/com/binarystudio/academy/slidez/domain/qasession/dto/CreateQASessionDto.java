package com.binarystudio.academy.slidez.domain.qasession.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQASessionDto {

	private String presentationId;

	private String slideId;

	private String title;

}
