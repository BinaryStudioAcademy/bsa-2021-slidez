package com.binarystudio.academy.slidez.domain.auth.oauth2;

import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.util.store.AbstractDataStoreFactory;
import com.google.api.client.util.store.DataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.concurrent.ThreadSafe;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ThreadSafe
@Component
// This is to document scope
@Scope("singleton")
public final class GoogleDataStoreFactory extends AbstractDataStoreFactory {

	private final Map<String, DataStore<StoredCredential>> storage = new ConcurrentHashMap<>();

	private final GoogleCredentialsService googleCredentialsService;

	@Autowired
	public GoogleDataStoreFactory(GoogleCredentialsService googleCredentialsService) {
		this.googleCredentialsService = googleCredentialsService;
	}

	@Override
	@SuppressWarnings("unchecked")
	public DataStore<StoredCredential> createDataStore(String id) {
		DataStore<StoredCredential> dataStore = storage.get(id);
		if (dataStore == null) {
			DataStore<StoredCredential> newDataSore = new GoogleDataStore(this, googleCredentialsService);
			storage.putIfAbsent(id, newDataSore);
			return storage.get(id);
		}
		return dataStore;
	}

}
