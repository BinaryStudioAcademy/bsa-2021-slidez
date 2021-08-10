package com.binarystudio.academy.slidez.domain.presentation.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PresentationUpdateDto {

	private UUID id;

	private String name;

	private String link;

	private LocalDateTime updatedAt;

}
