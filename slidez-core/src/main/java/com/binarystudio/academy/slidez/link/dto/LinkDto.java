package com.binarystudio.academy.slidez.link.dto;

import com.binarystudio.academy.slidez.link.model.Link;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkDto {

    private UUID linkId;

    private Long sessionId;

    private String link;

    private LocalDateTime expirationDate;

    public static LinkDto fromEntity(Link link) {
        return LinkDto
            .builder()
            .linkId(link.getLinkId())
            .sessionId(link.getSessionId())
            .link(link.getLink())
            .expirationDate(link.getExpirationDate())
            .build();
    }
}
