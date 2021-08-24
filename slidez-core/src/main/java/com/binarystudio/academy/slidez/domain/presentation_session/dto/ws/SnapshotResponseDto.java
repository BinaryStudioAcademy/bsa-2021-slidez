package com.binarystudio.academy.slidez.domain.presentation_session.dto.ws;

import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SnapshotResponseDto {

	private List<SessionPoll> sessionPolls = new ArrayList<>();

}
