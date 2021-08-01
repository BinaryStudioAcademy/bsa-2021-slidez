package com.binarystudio.academy.slidez.user;

import java.util.UUID;

import com.binarystudio.academy.slidez.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

}
