package com.binarystudio.academy.slidez.domain.poll.dto;

import java.util.Date;
import java.util.UUID;

import com.binarystudio.academy.slidez.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollDto {

    private UUID id;

    private String name;

    private Date createdAt;

    private Date updatedAt;

    private UserDto user;
}
