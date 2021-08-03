package com.binarystudio.academy.slidez.link;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.link.model.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LinkRepository extends JpaRepository<Link, UUID> {

    @Query("select count(l) from Link l where l.expirationDate is null")
    int getCountAvailableLinks();

    @Query(value = "SELECT link FROM Link ORDER BY link DESC LIMIT 1", nativeQuery = true)
    Optional<String> getLastLink();

    @Transactional
    @Modifying
    @Query("update Link u set u = :availableLink where u.linkId = :id")
    void update(Link availableLink, UUID id);

    @Query(value = "SELECT * FROM Link WHERE link.expiration_date IS NULL ORDER BY link ASC LIMIT 1", nativeQuery = true)
    Optional<Link> getAvailableLink();

    @Query(value = "select * from Link where expiration_date <= cast((now()) as date)", nativeQuery = true)
    List<Link> getLinksWithExpiredLeases();
}
