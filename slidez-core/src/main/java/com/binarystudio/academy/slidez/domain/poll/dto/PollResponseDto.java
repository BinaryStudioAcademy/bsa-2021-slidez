package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
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

	private InteractiveElement owner;

}
