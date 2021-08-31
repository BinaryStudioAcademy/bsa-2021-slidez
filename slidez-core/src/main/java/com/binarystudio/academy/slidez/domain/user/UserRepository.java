package com.binarystudio.academy.slidez.domain.user;

import java.util.Optional;
import java.util.UUID;

import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);

	@Transactional
	@Modifying
	@Query("DELETE FROM User u WHERE u.id = :id")
	void deleteWithId(UUID id);

}
