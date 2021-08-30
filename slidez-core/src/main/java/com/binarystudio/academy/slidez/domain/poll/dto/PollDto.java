package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollDto extends InteractiveElementDto {

	private String title;

	private Boolean isTemplate;

	private Boolean isMulti;

	private List<PollOptionDto> pollOptions;

}
