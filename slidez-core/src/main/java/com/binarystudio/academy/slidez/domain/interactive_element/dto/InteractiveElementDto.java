package com.binarystudio.academy.slidez.domain.interactive_element.dto;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import lombok.Data;

import java.util.UUID;

@Data
public class InteractiveElementDto {

	private UUID id;

	private InteractiveElementType type;

	private String slideId;

	private UUID ownerId;

}
