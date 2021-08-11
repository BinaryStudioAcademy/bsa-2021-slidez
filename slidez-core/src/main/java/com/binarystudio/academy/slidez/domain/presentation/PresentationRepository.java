package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface PresentationRepository extends JpaRepository<Presentation, UUID> {

	@Transactional
	@Modifying
	@Query("UPDATE Presentation p SET " + "p.name = :#{#dto.name}, " + "p.link = :#{#dto.link}, "
			+ "p.updatedAt = :#{#dto.updatedAt} " + "WHERE p.id = :#{#dto.id}")
	void update(PresentationUpdateDto dto);

}
