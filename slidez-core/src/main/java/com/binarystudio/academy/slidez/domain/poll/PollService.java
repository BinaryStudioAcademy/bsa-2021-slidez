package com.binarystudio.academy.slidez.domain.poll;

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

	@Transactional
	public Poll create(PollDto pollDto) {
		Poll poll = PollMapper.INSTANCE.pollDtoToPoll(pollDto);
		return pollRepository.saveAndFlush(poll);
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

	public Optional<PollResponseDto> getById(UUID id) {
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
