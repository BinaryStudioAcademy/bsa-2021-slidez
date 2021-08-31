package com.binarystudio.academy.slidez.domain.quiz;

import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QuizRepository extends JpaRepository<Quiz, UUID> {

	Optional<Quiz> findBySlideIdIs(String slideId);

}
