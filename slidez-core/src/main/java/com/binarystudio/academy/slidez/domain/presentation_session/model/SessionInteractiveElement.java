package com.binarystudio.academy.slidez.domain.presentation_session.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import lombok.Data;

import java.util.UUID;

@Data
public class SessionInteractiveElement {

	private UUID id;

	private InteractiveElementType type;

	private String slideId;

}
