package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    //TODO: verify user_id before

    public List<PollDto> getPolls() {
        return pollRepository
            .findAll()
            .stream()
            .map(PollDto::fromEntity)
            .collect(Collectors.toList());
    }

    public Optional<PollDto> getPollById(UUID id) {
        return pollRepository.findById(id).map(PollDto::fromEntity);
    }

}
