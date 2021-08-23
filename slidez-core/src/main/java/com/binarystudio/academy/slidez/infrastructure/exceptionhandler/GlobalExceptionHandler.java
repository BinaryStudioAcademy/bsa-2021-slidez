package com.binarystudio.academy.slidez.infrastructure.exceptionhandler;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	private final ExceptionProperties exceptionProperties;

	@Autowired
	public GlobalExceptionHandler(ExceptionProperties exceptionProperties) {
		this.exceptionProperties = exceptionProperties;
	}

	@ExceptionHandler(DomainException.class)
	public ResponseEntity<GenericResponse<Object, String>> domainException(DomainException ex) {
		String message = ex.getMessage();
		this.logger.error(ex.getMessage());
		this.logger.error(ex.getStackTrace());
		GenericResponse<Object, String> out = new GenericResponse<>(null, message);
		return new ResponseEntity<>(out, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Throwable.class)
	public ResponseEntity<GenericResponse<Object, String>> unpredictedException(Throwable ex) {
		GenericResponse<Object, String> out = new GenericResponse<>(null,
				exceptionProperties.getUnpredictedExceptionMessage());
		this.logger.error(ex.getMessage());
		this.logger.error(ex.getStackTrace());
		return new ResponseEntity<>(out, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
