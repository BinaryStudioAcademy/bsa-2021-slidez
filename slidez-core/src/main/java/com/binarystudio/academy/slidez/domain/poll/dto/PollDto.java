package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollDto {

    private UUID id;

    private String name;

    private Date createdAt;

    private Date updatedAt;

    private UserDto user;

    public static PollDto fromEntity(Poll poll) {
        return PollDto
            .builder()
            .id(poll.getId())
            .name(poll.getName())
            .createdAt(poll.getCreatedAt())
            .updatedAt(poll.getUpdatedAt())
            .user(UserDto.fromEntity(poll.getUser()))
            .build();
    }
}
