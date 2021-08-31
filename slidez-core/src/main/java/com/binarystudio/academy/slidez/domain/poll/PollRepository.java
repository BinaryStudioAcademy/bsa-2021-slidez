package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PollRepository extends JpaRepository<Poll, UUID> {

	@Query("SELECT p FROM Poll p WHERE p.interactiveElement.slideId = :slideId")
	Optional<Poll> findBySlideId(String slideId);

}
