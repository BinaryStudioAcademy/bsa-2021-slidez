package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.session.exception.BadOptionException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionPoll extends SessionInteractiveElement {

	private String title;

	private Boolean isMulti;

	private List<SessionPollOption> options = new ArrayList<>();

	private Collection<SessionPollAnswer> answers = new HashSet<>();

	@JsonIgnore
	private Map<UUID, SessionPollAnswer> answeredByToAnswers = new HashMap<>();

	/**
	 * @return true, if answer was added
	 */
	public boolean addAnswer(SessionPollAnswer pollAnswer) throws BadOptionException {
		options.stream().filter(option -> Objects.equals(pollAnswer.getOptionId(), option.getId())).findFirst()
				.orElseThrow(() -> new BadOptionException(
						String.format("Option with ID %s not found", pollAnswer.getOptionId())));
		boolean isAdded = answeredByToAnswers.putIfAbsent(pollAnswer.getAnsweredBy(), pollAnswer) == null;
		this.answers = answeredByToAnswers.values();
		return isAdded;
	}

}
