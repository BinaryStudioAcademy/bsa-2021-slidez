package com.binarystudio.academy.slidez.domain.session.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionQAQuestion {

	private UUID id = UUID.randomUUID();

	private UUID qaSessionId;

	private String question;

	// Array of user ids who liked question
	private List<UUID> likedBy = new ArrayList<>();

	private LocalDateTime createdAt = LocalDateTime.now();

	private String authorNickname = "Anonymous";

}
