package com.binarystudio.academy.slidez.domain.presentation_session.handler;

import com.binarystudio.academy.slidez.app.presentationsession.PresentationSessionResponseCodes;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation_session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.presentation_session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.event.StartPollEvent;
import com.binarystudio.academy.slidez.domain.presentation_session.mapper.SessionInteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.presentation_session.model.SessionPoll;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class CreatePollHandler extends AbstractDomainEventHandler {

	private final PollService pollService;

	@Autowired
	public CreatePollHandler(PollService pollService) {
		this.pollService = pollService;
	}

    /**
     * @returns {@link GenericResponse<SessionPoll, PresentationSessionResponseCodes>}
     * */
    @Override
    public GenericResponse<Object, PresentationSessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore eventStore) {
		if (Objects.equals(domainEvent.getClass(), StartPollEvent.class)) {
			StartPollEvent event = (StartPollEvent) domainEvent;
			Optional<Poll> pollOptional = pollService.getById(event.getPollId());
			if (pollOptional.isEmpty()) {
				return new GenericResponse<>(null, PresentationSessionResponseCodes.COULD_NOT_START_POLL);
			}
            Poll poll = pollOptional.get();
            SessionInteractiveElementMapper mapper = SessionInteractiveElementMapper.INSTANCE;
			SessionPoll sessionPoll = mapper.mapPollToSessionPoll(poll);
			event.setSessionPoll(sessionPoll);
			eventStore.applyEvent(event);
			return new GenericResponse<>(sessionPoll);
		}
		return super.handle(domainEvent, eventStore);
	}

}
