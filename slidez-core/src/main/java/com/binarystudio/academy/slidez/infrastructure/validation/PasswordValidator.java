package com.binarystudio.academy.slidez.infrastructure.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class PasswordValidator {

	// (?=.*[A-Z]) Ensure string has 1 uppercase letters.
	// (?=.*[!@#$&*]) Ensure string has one special case letter.
	// (?=.*[0-9]) Ensure string has 1 digits.
	// .{12,} Ensure string is of length not less 12.
	private static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{12,}$";

	private static final Pattern PATTERN = Pattern.compile(PASSWORD_PATTERN);

	public boolean isValid(final String password) {
		Matcher matcher = PATTERN.matcher(password);
		return matcher.matches();
	}

}
