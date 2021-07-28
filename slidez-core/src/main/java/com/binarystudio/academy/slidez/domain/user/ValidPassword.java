package com.binarystudio.academy.slidez.domain.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = PasswordConstraintValidator.class)
@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
public @interface ValidPassword {

    String message() default "Password doesn't match the security policy \n 12 chars long, 1 upper case, 1 number, 1 special char";

    int lengthMin() default 12;

    int uppercaseCount() default 1;

    int specialCharacter() default 1;

    int digitsCount() default 1;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
