package com.binarystudio.academy.slidez.domain.user;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class UserValidator {

	// (?=.*[A-Z]) Ensure string has 1 uppercase letters.
	// (?=.*[!@#$&*]) Ensure string has one special case letter.
	// (?=.*[0-9]) Ensure string has 1 digits.
	// .{12,} Ensure string is of length not less 12.
	private static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{12,}$";

	private static final Pattern PASSWORD_COMPILED_PATTERN = Pattern.compile(PASSWORD_PATTERN);

	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	private static final Pattern EMAIL_COMPILED_PATTERN = Pattern.compile(EMAIL_PATTERN);

	public String isEmailAndPasswordValid(String email, String password) {
		if (!isPasswordValid(password)) {
			return "Incorrect password";
		}
		if (!isEmailValid(email)) {
			return "Incorrect email";
		}
		return null;
	}

	public boolean isEmailValid(final String email) {
		Matcher matcher = EMAIL_COMPILED_PATTERN.matcher(email);
		return matcher.matches();
	}

	public boolean isPasswordValid(final String password) {
		Matcher matcher = PASSWORD_COMPILED_PATTERN.matcher(password);
		return matcher.matches();
	}

}
