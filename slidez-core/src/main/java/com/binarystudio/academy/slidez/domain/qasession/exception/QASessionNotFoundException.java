package com.binarystudio.academy.slidez.domain.qasession.exception;

import com.binarystudio.academy.slidez.domain.exception.DomainException;

public class QASessionNotFoundException extends DomainException {

    public QASessionNotFoundException(String message) {
        super(message);
    }
}
