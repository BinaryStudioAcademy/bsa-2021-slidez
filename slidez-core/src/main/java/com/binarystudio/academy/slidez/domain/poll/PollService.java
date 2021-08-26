package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.dto.PollResponseDto;
import com.binarystudio.academy.slidez.domain.poll.exception.PollNotFoundException;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PollService {

	private final PollRepository pollRepository;

	@Autowired
	public PollService(PollRepository pollRepository) {
		this.pollRepository = pollRepository;
	}

	// todo: fix this
	@Transactional
	public Poll create(CreatePollDto pollDto, UUID userId) {
		throw new UnsupportedOperationException();
	}

	@Transactional
	public Poll update(PollDto pollDto) throws PollNotFoundException {
		if (!existsById(pollDto.getId())) {
			throw new PollNotFoundException("Poll with such Id not found.");
		}
		Poll poll = PollMapper.INSTANCE.pollDtoToPoll(pollDto);
		pollRepository.saveAndFlush(poll);
		return poll;
	}

	@Transactional
	public void remove(UUID id) {
		pollRepository.deleteById(id);
	}

	public List<Poll> getAll() {
		return pollRepository.findAll();
	}

	public Optional<Poll> getById(UUID id) {
		return pollRepository.findById(id);
	}

    public Optional<Poll> getBySlideId(String slideId) {
        return pollRepository.findBySlideIdIs(slideId);
    }

	public Optional<PollResponseDto> getPollDtoById(UUID id) {
		Optional<Poll> pollOptional = pollRepository.findById(id);
		if (pollOptional.isEmpty()) {
			return Optional.empty();
		}
		PollResponseDto pollResponseDto = PollMapper.INSTANCE.pollToPollResponseDto(pollOptional.get());
		return Optional.of(pollResponseDto);
	}

	public boolean existsById(UUID id) {
		return pollRepository.existsById(id);
	}

}
