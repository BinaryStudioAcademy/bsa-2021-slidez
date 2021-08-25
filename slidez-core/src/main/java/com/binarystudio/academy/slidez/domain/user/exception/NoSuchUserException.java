package com.binarystudio.academy.slidez.domain.user.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class NoSuchUserException extends DomainException {

    public NoSuchUserException(String message) {
        super(message);
    }
}
