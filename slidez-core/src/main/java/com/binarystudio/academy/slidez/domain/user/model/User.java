package com.binarystudio.academy.slidez.domain.user.model;

import com.binarystudio.academy.slidez.domain.googlecredentials.GoogleCredentials;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.userprofile.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "email", unique = true, nullable = false)
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@OneToOne(mappedBy = "user")
	private UserProfile userProfile;

	@OneToOne(mappedBy = "user")
	private GoogleCredentials googleCredentials;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private Set<Presentation> presentations;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	public User(String email, String password) {
		this.email = email;
		this.password = password;
		LocalDateTime now = LocalDateTime.now();
		this.createdAt = now;
		this.updatedAt = now;
	}

	public static User createUser(String email, String password) {
		User user = new User(email, password);
		user.setRole(UserRole.USER);
		return user;
	}

	public static User createAdmin(String email, String password) {
		User user = new User(email, password);
		user.setRole(UserRole.ADMIN);
		return user;
	}

}
