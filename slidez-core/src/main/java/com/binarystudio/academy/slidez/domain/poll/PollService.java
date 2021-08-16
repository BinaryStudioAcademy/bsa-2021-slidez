package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.time.LocalDateTime.now;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Poll create(PollDto pollDto) {
        Poll poll = PollMapper.INSTANCE.pollDtoToPoll(pollDto);
        LocalDateTime now = now();
        poll.setCreatedAt(now);
        poll.setUpdatedAt(now);
        return pollRepository.saveAndFlush(poll);
    }

    @Transactional
    public void update(PollDto pollDto) throws EntityNotFoundException {
        if(!existsById(pollDto.getId())) {
         throw new EntityNotFoundException("Poll with such Id not found.");
        }
        Poll poll = PollMapper.INSTANCE.pollDtoToPoll(pollDto);
        LocalDateTime now = now();
        poll.setCreatedAt(now);
        poll.setUpdatedAt(now);
        pollRepository.saveAndFlush(poll);
    }

    public List<Poll> getAll() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getById(UUID id) {
        return pollRepository.findById(id);
    }

    public boolean existsById(UUID id) {
       return pollRepository.existsById(id);
    }
}
