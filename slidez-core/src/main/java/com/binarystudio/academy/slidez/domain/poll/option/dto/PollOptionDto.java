package com.binarystudio.academy.slidez.domain.poll.option.dto;

import java.util.Date;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollOptionDto {

    private UUID id;

    private String name;

    private PollDto poll;

}

