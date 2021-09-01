package com.binarystudio.academy.slidez.domain.session.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionQuizOption {

	private UUID id;

	private String title;

	private Boolean isCorrect;

}
