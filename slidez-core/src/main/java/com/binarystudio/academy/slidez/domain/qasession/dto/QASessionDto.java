package com.binarystudio.academy.slidez.domain.qasession.dto;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class QASessionDto extends InteractiveElementDto {

	private String title;

}
