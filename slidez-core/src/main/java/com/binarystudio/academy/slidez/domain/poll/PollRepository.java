package com.binarystudio.academy.slidez.domain.poll;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Repository
public interface PollRepository extends JpaRepository<Poll, UUID> {

    @Modifying
    @Transactional
    @Query(value = "update polls p\n" +
        "set name = ?2 and updated_at = ?3\n" +
        "from polls p\n" +
        "where p.id = ?1",
        nativeQuery = true)
    void update(UUID id, String newName, Date newUpdateAt);
}
