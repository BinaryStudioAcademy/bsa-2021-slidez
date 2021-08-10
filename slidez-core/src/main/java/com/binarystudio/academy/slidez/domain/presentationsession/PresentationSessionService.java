package com.binarystudio.academy.slidez.domain.presentationsession;

import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionRequestDto;
import com.binarystudio.academy.slidez.domain.presentationsession.dto.CreateSessionResponseDto;
import com.binarystudio.academy.slidez.domain.presentationsession.events.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentationsession.events.PollCreatedEvent;
import com.binarystudio.academy.slidez.domain.link.LinkService;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.session.SessionService;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class PresentationSessionService {

	private final LinkService linkService;

	private final InMemoryPresentationEventRepository inMemoryPresentationEventRepository;

	private final SessionService sessionService;

	@Autowired
	public PresentationSessionService(LinkService linkService,
			InMemoryPresentationEventRepository inMemoryPresentationEventRepository, SessionService sessionService) {
		this.linkService = linkService;
		this.inMemoryPresentationEventRepository = inMemoryPresentationEventRepository;
		this.sessionService = sessionService;
	}

	public Optional<CreateSessionResponseDto> createSession(CreateSessionRequestDto dto, int leaseDuration) {
		// 1. Load all interactive elements for presentation
		// 2. For each such element create event-initiator (like PollCreatedEvt)
		DomainEvent event = new PollCreatedEvent("Do you like Java?", Arrays.asList("Yes", "Definitely", "Absolutely"));
		// 3. Create PresentationEventStore
		PresentationEventStore presentationEventStore = new PresentationEventStore();
		// 4. For each event call PresentationEventStore.apply(event)
		presentationEventStore = presentationEventStore.applyEvent(event);
		// 5. Add to repository (eventCode [link], PresentationEventStore )
		Optional<Link> linkOptional = linkService.leaseLink(leaseDuration);
		if (linkOptional.isEmpty()) {
			return Optional.empty();
		}
		Session session = sessionService.createForPresentation(dto.getPresentationId());
		Link link = linkOptional.get();
		link.setSession(session);
		linkService.update(link);
		if (inMemoryPresentationEventRepository.add(link.getLink(), presentationEventStore)) {
			return Optional.of(new CreateSessionResponseDto(link.getLink()));
		}
		// return link
		return Optional.empty();
	}

}
