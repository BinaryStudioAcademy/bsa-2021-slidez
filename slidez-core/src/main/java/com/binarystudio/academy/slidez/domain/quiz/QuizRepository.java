package com.binarystudio.academy.slidez.domain.quiz;

import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface QuizRepository extends JpaRepository<Quiz, UUID> {

	@Query("SELECT q FROM Quiz q WHERE q.interactiveElement.slideId = :slideId")
	Optional<Quiz> findBySlideId(String slideId);

}
