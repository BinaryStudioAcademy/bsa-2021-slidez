package com.binarystudio.academy.slidez.domain.presentationsession;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryPresentationEventRepository {

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

}
