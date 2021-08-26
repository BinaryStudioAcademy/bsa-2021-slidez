package com.binarystudio.academy.slidez.domain.presentation_session.dto;

import com.binarystudio.academy.slidez.domain.presentation_session.enums.ResponseType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {

	private ResponseType type;

	private Object data;

}
