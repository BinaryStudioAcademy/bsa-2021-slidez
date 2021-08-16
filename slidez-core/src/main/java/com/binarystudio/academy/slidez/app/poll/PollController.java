package com.binarystudio.academy.slidez.app.poll;

import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${v1API}/polls")
public class PollController {

    private final PollService pollService;

    @Autowired
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping
    public List<Poll> getAll() {
        return pollService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable UUID id) {
        if (id == null) {
            return new ResponseEntity<>("Invalid poll ID", HttpStatus.BAD_REQUEST);
        }
        Optional<Poll> pollOptional = pollService.getById(id);

        if (pollOptional.isEmpty()) {
            return new ResponseEntity<>("Poll not found.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pollOptional, HttpStatus.OK);
    }

    @PostMapping
    public UUID create(@RequestBody PollDto pollDto) {
        Poll poll = pollService.create(pollDto);
        return poll.getId();
    }

    @PutMapping
    public void update(@RequestBody PollDto pollDto) {
        pollService.update(pollDto);
    }
}
