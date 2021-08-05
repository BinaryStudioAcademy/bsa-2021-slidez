package com.binarystudio.academy.slidez.app.poll;

import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/polls")
public class PollController {
    @Autowired
    private PollService pollService;

    @GetMapping
    public List<PollDto> getPolls() {
        return pollService.getPolls();
    }

    @GetMapping("/{id}")
    public PollDto getPoll(@PathVariable UUID id) {
        return pollService.getPollById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Poll not found"));
    }

    @PostMapping
    public UUID createPoll(@RequestBody CreatePollDto poll) {
        return pollService.createPoll(poll)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can not create poll."));
    }

    @PutMapping("/{id}")
    public void updatePoll(@Valid @RequestBody Poll poll, @PathVariable UUID id) throws Exception {
        pollService.updatePoll(id, poll.getName(), poll.getUpdatedAt());
    }
}
