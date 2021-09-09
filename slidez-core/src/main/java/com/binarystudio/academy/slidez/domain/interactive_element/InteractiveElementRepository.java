package com.binarystudio.academy.slidez.domain.interactive_element;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface InteractiveElementRepository extends JpaRepository<InteractiveElement, UUID> {

	@Query("SELECT ie FROM InteractiveElement ie WHERE ie.slideId = :slideId")
	Optional<InteractiveElement> findBySlideId(String slideId);

}
