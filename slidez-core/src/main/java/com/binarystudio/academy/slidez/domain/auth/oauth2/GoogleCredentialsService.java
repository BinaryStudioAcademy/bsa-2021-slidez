package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.auth.oauth2.model.GoogleCredentials;
import com.binarystudio.academy.slidez.domain.user.UserRepository;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.google.api.client.auth.oauth2.StoredCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Service
public class GoogleCredentialsService {

	private final GoogleCredentialsRepository googleCredentialsRepository;

	private final UserRepository userRepository;

	@Autowired
	public GoogleCredentialsService(GoogleCredentialsRepository googleCredentialsRepository,
			UserRepository userRepository) {
		this.googleCredentialsRepository = googleCredentialsRepository;
		this.userRepository = userRepository;
	}

	public GoogleCredentials saveForUser(UUID userId, StoredCredential credential) {
        GoogleCredentials googleCredentials = getByUserId(userId).orElse(new GoogleCredentials());
        LocalDateTime now = LocalDateTime.now();
        if (googleCredentials.getUser() == null) {
            User user = userRepository.getById(userId);
            googleCredentials.setUser(user);
            googleCredentials.setCreatedAt(now);
        }
        googleCredentials.setUpdatedAt(now);
        googleCredentials.setAccessToken(credential.getAccessToken());
        googleCredentials.setRefreshToken(credential.getRefreshToken());
        googleCredentials.setExpirationTimeMillis(credential.getExpirationTimeMilliseconds());
        return googleCredentialsRepository.save(googleCredentials);
	}

	public void deleteAll() {
		googleCredentialsRepository.deleteAll();
	}

	public void deleteById(UUID id) {
		googleCredentialsRepository.deleteById(id);
	}

	public Optional<GoogleCredentials> getByUserId(UUID userId) {
		return googleCredentialsRepository.findByUserId(userId);
	}

	public Collection<GoogleCredentials> findAll() {
		return googleCredentialsRepository.findAll();
	}

}
