package com.binarystudio.academy.slidez.domain.auth.jwtauth.validation;

import java.util.Objects;
import java.util.regex.Pattern;

import com.binarystudio.academy.slidez.domain.auth.jwtauth.model.AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AuthorizationRequestValidator implements Validator {

	// (?=.*[A-Z]) Ensure string has 1 uppercase letters.
	// (?=.*[!@#$&*]) Ensure string has one special case letter.
	// (?=.*[0-9]) Ensure string has 1 digits.
	// .{12,} Ensure string is of length not less 12.
	private static final String PASSWORD_REGEX = "^(?=.*^\\S*$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,32}$";

	private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

	private static final String EMAIL_REGEX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

	@Override
	public boolean supports(Class<?> clazz) {
		return Objects.equals(clazz, AuthorizationRequest.class);
	}

	@Override
	public void validate(Object target, Errors errors) {
		AuthorizationRequest request = (AuthorizationRequest) target;
		validatePassword(request.getPassword(), errors);
		validateEmail(request.getEmail(), errors);
	}

	public void validateEmail(String email, Errors errors) {
		if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
			errors.rejectValue("email", "", "Invalid email");
		}
	}

	public void validatePassword(String password, Errors errors) {
		if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
			errors.rejectValue("password", "", "Invalid email");
		}
	}

}
