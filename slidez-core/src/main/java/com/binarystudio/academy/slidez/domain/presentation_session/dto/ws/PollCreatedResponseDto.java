package com.binarystudio.academy.slidez.domain.presentation_session.dto.ws;

import com.binarystudio.academy.slidez.domain.presentation_session.model.PollOption;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PollCreatedResponseDto {

	private String name;

	private List<PollOption> options;

	private UUID id;

	private List<UUID> answers;

}
