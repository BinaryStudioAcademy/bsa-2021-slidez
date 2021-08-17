package com.binarystudio.academy.slidez.domain.exceptionhandler;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	private final ExceptionProperties exceptionProperties;

	@Autowired
	public GlobalExceptionHandler(ExceptionProperties exceptionProperties) {
		this.exceptionProperties = exceptionProperties;
	}

	@ExceptionHandler(DomainException.class)
	public ResponseEntity<GenericResponse<Object, String>> domainException(DomainException ex) {
		String message = ex.getMessage();
		GenericResponse<Object, String> out = new GenericResponse<>(null, message);
		return new ResponseEntity<>(out, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(Throwable.class)
	public ResponseEntity<GenericResponse<Object, String>> unpredictedException(Throwable ex) {
		GenericResponse<Object, String> out = new GenericResponse<>(null,
				exceptionProperties.getUnpredictedExceptionMessage());
		return new ResponseEntity<>(out, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
