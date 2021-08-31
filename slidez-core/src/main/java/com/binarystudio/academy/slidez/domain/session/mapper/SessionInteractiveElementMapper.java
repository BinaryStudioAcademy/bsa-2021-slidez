package com.binarystudio.academy.slidez.domain.session.mapper;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.session.data.SessionPollOption;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface SessionInteractiveElementMapper {

	SessionInteractiveElementMapper INSTANCE = Mappers.getMapper(SessionInteractiveElementMapper.class);

	@Mappings({ @Mapping(source = "poll.id", target = "id"),
			@Mapping(source = "poll.interactiveElement.type", target = "type"),
			@Mapping(source = "poll.interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "poll.title", target = "title"), @Mapping(source = "poll.isMulti", target = "isMulti"),
			@Mapping(source = "poll.isTemplate", target = "isTemplate"),
			@Mapping(target = "options", expression = "java(mapPollOptionsToSessionPollOptions(poll.getOptions()))") })
	SessionPoll mapPollToSessionPoll(Poll poll);

	List<SessionPollOption> mapPollOptionsToSessionPollOptions(List<PollOption> pollOption);

	@Mappings({ @Mapping(source = "qaSession.id", target = "id"),
			@Mapping(source = "qaSession.interactiveElement.type", target = "type"),
			@Mapping(source = "qaSession.interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "qaSession.title", target = "title") })
	SessionQASession mapQASessionToSessionQASession(QASession qaSession);

}
