package com.binarystudio.academy.slidez.domain.session;

import org.springframework.stereotype.Repository;

import javax.annotation.concurrent.ThreadSafe;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@ThreadSafe
public class InMemoryPresentationEventStoreRepository {

	private final Map<String, PresentationEventStore> store = new ConcurrentHashMap<>();

	public boolean add(String link, PresentationEventStore eventStore) {
		return store.putIfAbsent(link, eventStore) == null;
	}

	public void remove(String link) {
		store.remove(link);
	}

	public void set(String link, PresentationEventStore eventStore) {
		store.put(link, eventStore);
	}

	public Optional<PresentationEventStore> get(String link) {
		return Optional.ofNullable(store.get(link));
	}

}
