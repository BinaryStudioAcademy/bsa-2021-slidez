package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PollCreatedResponseDto extends AbstractWebSocketResponseDto {

	private String name;

	private List<String> options;

	private UUID id;

	private List<Integer> answers;

}
