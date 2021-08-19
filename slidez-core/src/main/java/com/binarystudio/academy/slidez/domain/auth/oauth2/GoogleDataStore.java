package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.binarystudio.academy.slidez.domain.auth.oauth2.mapper.GoogleCredentialsMapper;
import com.binarystudio.academy.slidez.domain.auth.oauth2.model.GoogleCredentials;
import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.util.store.AbstractDataStore;
import com.google.api.client.util.store.DataStore;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Serializable;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
/**
 * Class is used to store StoredCredentials, bounded to user's id and mapped into
 * {@link GoogleCredentials}
 */
public class GoogleDataStore extends AbstractDataStore<StoredCredential> implements Serializable {

	private static final long serialVersionUID = -83745120312356L;

	private final GoogleCredentialsService googleCredentialsService;

	@Autowired
	public GoogleDataStore(GoogleDataStoreFactory googleDataStoreFactory,
			GoogleCredentialsService googleCredentialsService) {
		super(googleDataStoreFactory, UUID.randomUUID().toString());
		this.googleCredentialsService = googleCredentialsService;
	}

	@Override
	public Set<String> keySet() {
		return googleCredentialsService.findAll().stream().map(creds -> creds.getUser().getId().toString())
				.collect(Collectors.toSet());
	}

	@Override
	public Collection<StoredCredential> values() {
		GoogleCredentialsMapper mapper = GoogleCredentialsMapper.INSTANCE;
		return googleCredentialsService.findAll().stream().map(mapper::mapGoogleCredentialsToStoredCredentials)
				.collect(Collectors.toList());
	}

	@Override
	@Nullable
	/**
	 * @param key - User's id
	 */
	public StoredCredential get(String key) throws IOException, DomainException {
		Optional<GoogleCredentials> googleCredentialsOptional = googleCredentialsService
				.getByUserId(UUID.fromString(key));
		GoogleCredentials googleCredentials = googleCredentialsOptional
				.orElseThrow(() -> new DomainException("Not found google tokens for user"));
		GoogleCredentialsMapper mapper = GoogleCredentialsMapper.INSTANCE;
		return mapper.mapGoogleCredentialsToStoredCredentials(googleCredentials);
	}

	@Override
	/**
	 * @param key - User's id
	 */
	public DataStore<StoredCredential> set(String key, StoredCredential value) {
		googleCredentialsService.saveForUser(UUID.fromString(key), value);
		return this;
	}

	@Override
	public DataStore<StoredCredential> clear() {
		googleCredentialsService.deleteAll();
		return this;
	}

	@Override
	public DataStore<StoredCredential> delete(String key) {
		googleCredentialsService.deleteById(UUID.fromString(key));
		return this;
	}

}
