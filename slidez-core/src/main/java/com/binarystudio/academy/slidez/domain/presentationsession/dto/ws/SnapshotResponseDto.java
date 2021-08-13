package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class SnapshotResponseDto extends AbstractWebSocketResponseDto {

	private List<Poll> polls = new ArrayList<>();

}
