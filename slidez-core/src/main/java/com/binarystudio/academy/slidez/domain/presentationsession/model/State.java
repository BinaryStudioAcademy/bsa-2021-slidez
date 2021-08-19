package com.binarystudio.academy.slidez.domain.presentationsession.model;

import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.presentationsession.exception.BadOptionException;
import com.binarystudio.academy.slidez.domain.presentationsession.mapper.PollMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class State {

    private PollService pollService;

    @Autowired
    public void setPollService(PollService pollService) {
        this.pollService = pollService;
    }

    private final List<Poll> polls = new ArrayList<>();

	public List<Poll> getPolls() {
		return Collections.unmodifiableList(polls);
	}

    public void loadInteraction(UUID pollId) {
        Optional<PollResponseDto> pollResponseDtoOptional = pollService.getById(pollId);
        PollResponseDto pollResponseDto = pollResponseDtoOptional.orElseThrow(() ->
            new PollNotFoundException(String.format("Poll with id %s not found in the DB", pollId)));
        Poll poll = PollMapper.INSTANCE.pollResponseDtoToPoll(pollResponseDto);
        polls.add(poll);
    }


	public void addPoll(Poll poll) {
		polls.add(poll);
	}

	public void addAnswerToThePoll(UUID pollId, UUID answerId) throws PollNotFoundException, BadOptionException {
		polls.stream().filter(poll -> poll.getId().equals(pollId)).findFirst()
				.orElseThrow(() -> new PollNotFoundException(String.format("Poll with id %s not found", pollId)))
				.addAnswer(answerId);
	}

}
