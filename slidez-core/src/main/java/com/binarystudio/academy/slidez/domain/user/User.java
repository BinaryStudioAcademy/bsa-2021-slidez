package com.binarystudio.academy.slidez.domain.user;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Entity;
import java.util.UUID;

@Data
@Entity
@Builder
public class User {
    private UUID id;

    private String email;
    private String nickname;
    private String passwordHash;
}
