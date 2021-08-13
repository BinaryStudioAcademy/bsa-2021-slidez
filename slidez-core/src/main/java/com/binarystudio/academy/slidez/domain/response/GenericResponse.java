package com.binarystudio.academy.slidez.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenericResponse<Data, Error> {

	private Data data;

	private Error error;

	public GenericResponse(Data data){
	    this.data = data;
    }
}
