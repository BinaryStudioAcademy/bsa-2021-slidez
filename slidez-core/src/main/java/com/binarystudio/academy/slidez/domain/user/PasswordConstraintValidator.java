package com.binarystudio.academy.slidez.domain.user;

import org.passay.DigitCharacterRule;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.SpecialCharacterRule;
import org.passay.UppercaseCharacterRule;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {
    private int lengthMin;
    private int digitsCount;
    private int uppercaseCount;
    private int specialCharacter;

    @Override
    public void initialize(ValidPassword validPassword) {
        lengthMin       = validPassword.lengthMin();
        digitsCount     = validPassword.digitsCount();
        uppercaseCount  = validPassword.uppercaseCount();
        specialCharacter = validPassword.specialCharacter();
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(lengthMin, 100),
                new UppercaseCharacterRule(uppercaseCount),
                new DigitCharacterRule(digitsCount),
                new SpecialCharacterRule(specialCharacter)));
        RuleResult result = validator.validate(new PasswordData(password));
        return result.isValid();
    }
}