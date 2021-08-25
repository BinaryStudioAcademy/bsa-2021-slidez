package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.poll.PollService;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.session.event.StartPollEvent;
import com.binarystudio.academy.slidez.domain.session.mapper.SessionInteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class StartPollHandler extends AbstractDomainEventHandler {

	private final PollService pollService;

	@Autowired
	public StartPollHandler(PollService pollService) {
		this.pollService = pollService;
	}

	/**
	 * @returns {@link GenericResponse<SessionPoll, SessionResponseCodes>}
	 */
	@Override
	public GenericResponse<Object, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore eventStore) {
		if (Objects.equals(domainEvent.getClass(), StartPollEvent.class)) {
			StartPollEvent event = (StartPollEvent) domainEvent;
			Optional<Poll> pollOptional = pollService.getById(event.getPollId());
			if (pollOptional.isEmpty()) {
				return new GenericResponse<>(null, SessionResponseCodes.COULD_NOT_START_POLL);
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
