package com.binarystudio.academy.slidez.domain.poll;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollRepository extends JpaRepository<Poll, UUID> {
}
