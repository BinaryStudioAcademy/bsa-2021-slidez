package com.binarystudio.academy.slidez.domain.response;

import lombok.Data;

@Data
public class GenericResponse<Data, Error> {

	private final Data data;

	private final Error error;

}
