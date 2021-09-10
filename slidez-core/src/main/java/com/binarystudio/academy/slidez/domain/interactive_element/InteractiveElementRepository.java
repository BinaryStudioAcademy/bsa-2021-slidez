package com.binarystudio.academy.slidez.domain.interactive_element;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface InteractiveElementRepository extends JpaRepository<InteractiveElement, UUID> {

	@Query("SELECT ie FROM InteractiveElement ie WHERE ie.slideId = :slideId")
	Optional<InteractiveElement> findBySlideId(String slideId);

	@Query("DELETE FROM InteractiveElement ie WHERE ie.slideId = :slideId")
	@Transactional
	@Modifying
	void deleteBySlideId(String slideId);

}
