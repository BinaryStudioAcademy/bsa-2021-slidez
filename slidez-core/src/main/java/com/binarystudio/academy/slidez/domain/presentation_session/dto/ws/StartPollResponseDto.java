package com.binarystudio.academy.slidez.domain.presentation_session.dto.ws;

import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPollOption;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StartPollResponseDto {

	private String name;

	private List<SessionPollOption> options;

	private UUID id;

	private List<UUID> answers;

}
