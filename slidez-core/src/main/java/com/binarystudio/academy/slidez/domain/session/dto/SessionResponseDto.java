package com.binarystudio.academy.slidez.domain.session.dto;

import com.binarystudio.academy.slidez.domain.session.model.SessionStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SessionResponseDto {

	private UUID id;

	private UUID presentationId;

	private SessionStatus status;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

}
