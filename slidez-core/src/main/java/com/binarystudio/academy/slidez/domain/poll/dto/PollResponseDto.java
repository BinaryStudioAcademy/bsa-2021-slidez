package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElement;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class PollResponseDto {

	private UUID id;

	private String name;

	private boolean isMulti;

	private boolean isTemplate;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

	private List<PollOption> options;

	private PresentationInteractiveElement owner;

}
