package com.binarystudio.academy.slidez.domain.session.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.session.model.SessionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionUpdateDto {

	private UUID id;

	private UUID presentationId;

	private SessionStatus status;

	private LocalDateTime updatedAt;

}
