package com.binarystudio.academy.slidez.domain.link.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkDto {

	private Long linkId;

	private UUID sessionId;

	private String link;

	private LocalDateTime expirationDate;

}
