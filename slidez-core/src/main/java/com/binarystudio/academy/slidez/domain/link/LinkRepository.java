package com.binarystudio.academy.slidez.domain.link;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.link.model.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("checkstyle:AnnotationUseStyle")
@Repository
public interface LinkRepository extends JpaRepository<Link, UUID> {

	@Query("select count(l) from Link l where l.leasedUntil is null")
	int getCountAvailableLinks();

	@Query(value = "SELECT * FROM link ORDER BY code DESC LIMIT 1", nativeQuery = true)
	Optional<Link> getLastLink();

	@Transactional
	@Modifying
	@Query("update Link u set u = :availableLink where u.id = :id")
	void update(Link availableLink, UUID id);

	@Query(value = "SELECT * FROM link WHERE leased_until IS NULL ORDER BY code LIMIT 1", nativeQuery = true)
	Optional<Link> getAvailableLink();

	@Query(value = "select l from Link l where l.leasedUntil <= :now")
	List<Link> getLinksWithExpiredLeases(LocalDateTime now);

}
