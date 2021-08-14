package com.binarystudio.academy.slidez.domain.email;

import com.binarystudio.academy.slidez.domain.email.dto.EmailMessageDto;
import com.binarystudio.academy.slidez.domain.email.exception.CouldNotSendEmailException;

public interface EmailSender {

	boolean sendEmail(EmailMessageDto emailMessageDto) throws CouldNotSendEmailException;

}
