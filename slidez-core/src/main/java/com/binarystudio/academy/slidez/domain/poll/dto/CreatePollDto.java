package com.binarystudio.academy.slidez.domain.poll.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
public class CreatePollDto {
    private final UUID id;
    private final String name;
    private final Date createAt;
    private final Date updatedAt;
    private final UUID userId;
}
