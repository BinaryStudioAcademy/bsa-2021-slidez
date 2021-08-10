package com.binarystudio.academy.slidez.domain.presentationsession.snapshot;

import com.binarystudio.academy.slidez.domain.presentationsession.model.Poll;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class SimpleSnapshot implements Snapshot {

	@Getter
	private final List<Poll> polls;

	public SimpleSnapshot(List<Poll> polls) {
		this.polls = new ArrayList<>(polls);
	}

}
