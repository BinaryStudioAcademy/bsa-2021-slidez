package com.binarystudio.academy.slidez.app.poll;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
}
