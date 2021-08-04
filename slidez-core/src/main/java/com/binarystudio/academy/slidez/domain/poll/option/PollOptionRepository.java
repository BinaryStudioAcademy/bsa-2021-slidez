package com.binarystudio.academy.slidez.domain.poll.option;

import java.util.UUID;

import com.binarystudio.academy.slidez.domain.poll.option.model.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollOptionRepository extends JpaRepository<PollOption, UUID> {
}
