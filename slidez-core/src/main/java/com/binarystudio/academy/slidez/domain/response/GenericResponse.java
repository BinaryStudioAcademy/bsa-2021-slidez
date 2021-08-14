package com.binarystudio.academy.slidez.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenericResponse<T, E> {

	private T data;

	private E error;

	public GenericResponse(T data) {
		this.data = data;
	}

}
