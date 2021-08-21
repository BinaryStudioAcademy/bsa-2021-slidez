package com.binarystudio.academy.slidez.infrastructure.exceptionhandler;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "exception")
@Data
public class ExceptionProperties {

	private String unpredictedExceptionMessage;

}
