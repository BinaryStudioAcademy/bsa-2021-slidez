package com.binarystudio.academy.slidez.domain.email;

import com.binarystudio.academy.slidez.domain.email.dto.EmailMessageDto;

import java.io.IOException;

public interface EmailSender {

    boolean sendEmail(EmailMessageDto emailMessageDto) throws IOException;

}
