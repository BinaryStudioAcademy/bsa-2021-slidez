package com.binarystudio.academy.slidez.domain.iteractiveelement;

import com.binarystudio.academy.slidez.domain.iteractiveelement.model.InteractiveElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InteractiveElementRepository extends JpaRepository<InteractiveElement, UUID> {

}
