package com.binarystudio.academy.slidez.domain.email.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmailMessageDto {
    private final String subject;
    private final String email;
    private final String content;
}
