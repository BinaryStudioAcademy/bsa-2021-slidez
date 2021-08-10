package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.events.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.events.PollCreatedEvent;
import com.binarystudio.academy.slidez.link.LinkGenerationService;
import com.binarystudio.academy.slidez.link.model.Link;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class PresentationSessionService {

	private final LinkGenerationService linkGenerationService;

	private final InMemoryPresentationEventRepository inMemoryPresentationEventRepository;

	@Autowired
	public PresentationSessionService(LinkGenerationService linkGenerationService,
			InMemoryPresentationEventRepository inMemoryPresentationEventRepository) {
		this.linkGenerationService = linkGenerationService;
		this.inMemoryPresentationEventRepository = inMemoryPresentationEventRepository;
	}

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration) {
		// Create session
		// 1. Load all interactive elements for presentation
		// 2. For each such element create event-initiator (like PollCreatedEvt)
        DomainEvent event = new PollCreatedEvent("Do you like Java?", Arrays.asList(
            "Yes", "Definitely", "Absolutely"
        ));
		// 3. Create PresentationEventStore
		PresentationEventStore presentationEventStore = new PresentationEventStore();
		// 4. For each event call PresentationEventStore.apply(event)
        presentationEventStore = presentationEventStore.applyEvent(event);
		// 5. Add to repository (eventCode [link], PresentationEventStore )
        Optional<Link> linkOptional = linkGenerationService.leaseLink(leaseDuration);
        if (linkOptional.isEmpty()) {
            return Optional.empty();
        }
        Link link = linkOptional.get();
		if (inMemoryPresentationEventRepository.add(link.getLink(), presentationEventStore)) {
			return Optional.of(new CreateSessionResponseDto(link.getLink()));
		}
		// return link
		return Optional.empty();
	}

}
