package com.binarystudio.academy.slidez.domain.interactive_element;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InteractiveElementRepository extends JpaRepository<InteractiveElement, UUID> {

}
