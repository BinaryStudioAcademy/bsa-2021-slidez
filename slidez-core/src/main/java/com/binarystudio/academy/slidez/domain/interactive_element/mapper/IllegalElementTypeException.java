package com.binarystudio.academy.slidez.domain.interactive_element.mapper;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class IllegalElementTypeException extends DomainException {

    public IllegalElementTypeException(String message) {
        super(message);
    }
}
