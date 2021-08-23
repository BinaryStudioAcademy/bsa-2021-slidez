package com.binarystudio.academy.slidez.domain.presentation_iteractive_element;

import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PresentationInteractiveElementRepository extends JpaRepository<PresentationInteractiveElement, UUID> {

}
