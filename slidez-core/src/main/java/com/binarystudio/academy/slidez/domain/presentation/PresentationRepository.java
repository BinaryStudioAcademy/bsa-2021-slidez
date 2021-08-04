package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PresentationRepository extends JpaRepository<Presentation, UUID> {

}
