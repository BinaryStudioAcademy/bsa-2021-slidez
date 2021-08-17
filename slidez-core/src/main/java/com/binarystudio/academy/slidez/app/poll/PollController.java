package com.binarystudio.academy.slidez.app.poll;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
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
    public GenericResponse<PollResponseDto, PollResponseCodes> getById(@PathVariable UUID id) {
        if (id == null) {
            return new GenericResponse<>(null,  PollResponseCodes.ID_NOT_FOUND);
        }
        Optional<PollResponseDto> pollOptional = pollService.getById(id);

        if (pollOptional.isEmpty()) {
            return new GenericResponse<>(null, PollResponseCodes.NOT_FOUND);
        }

        return new GenericResponse<>(pollOptional.get());
    }

    @PostMapping
    public GenericResponse<UUID, PollResponseCodes> create(@RequestBody PollDto pollDto) {
        Poll poll = pollService.create(pollDto);
        return new GenericResponse<>(poll.getId());
    }

    @PutMapping
    public GenericResponse<UUID, PollResponseCodes>  update(@RequestBody PollDto pollDto) {
        Poll poll = pollService.update(pollDto);
        return new GenericResponse<>(poll.getId());
    }
}
