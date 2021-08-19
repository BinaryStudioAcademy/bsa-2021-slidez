package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.auth.oauth2.model.GoogleCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface GoogleCredentialsRepository extends JpaRepository<GoogleCredentials, UUID> {

	@Query("SELECT gc FROM GoogleCredentials gc WHERE gc.user.id = :userId")
	Optional<GoogleCredentials> findByUserId(UUID userId);

}
