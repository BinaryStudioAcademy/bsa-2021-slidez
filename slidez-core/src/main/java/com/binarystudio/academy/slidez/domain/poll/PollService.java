package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserRepository userRepository;

    //TODO: Create a check for userId
    //TODO: Write an utility to auto update PollOption

    //TODO: It make a snapshot of the Poll with options and then compare with new data o create or update

    public Optional<UUID> createPoll(CreatePollDto pollDto) {
        var user = userRepository.findById(pollDto.getUserId());

        return user.map(o -> {
            var poll = Poll.fromDto(pollDto, o);
            var result = pollRepository.save(poll);
            return result.getId();
        });
    }

    public void updatePoll(UUID id, String name, Date updatedAt) throws Exception {
        PollDto poll = getPollById(id)
            .orElseThrow(() -> new Exception("There is no poll with this id: " + id));
        pollRepository.update(poll.getId(), name, updatedAt);
    }

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
