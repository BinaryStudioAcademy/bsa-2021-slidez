package com.binarystudio.academy.slidez.domain.session.mapper;

import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.quiz.model.Quiz;
import com.binarystudio.academy.slidez.domain.quiz.model.QuizAnswer;
import com.binarystudio.academy.slidez.domain.session.data.SessionPoll;
import com.binarystudio.academy.slidez.domain.session.data.SessionPollOption;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuiz;
import com.binarystudio.academy.slidez.domain.session.data.SessionQuizOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface SessionInteractiveElementMapper {

	SessionInteractiveElementMapper INSTANCE = Mappers.getMapper(SessionInteractiveElementMapper.class);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "interactiveElement.type", target = "type"),
			@Mapping(source = "interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "title", target = "title"), @Mapping(source = "isMulti", target = "isMulti"),
			@Mapping(target = "options", expression = "java(mapPollOptionsToSessionPollOptions(poll.getOptions()))") })
	SessionPoll mapPollToSessionPoll(Poll poll);

	List<SessionPollOption> mapPollOptionsToSessionPollOptions(List<PollOption> pollOptions);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "interactiveElement.type", target = "type"),
			@Mapping(source = "interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "title", target = "title"), @Mapping(source = "isMulti", target = "isMulti"),
			@Mapping(target = "options", expression = "java(mapQuizAnswersToSessionQuizOptions(quiz.getAnswers()))") })
	SessionQuiz mapQuizToSessionQuiz(Quiz quiz);

	List<SessionQuizOption> mapQuizAnswersToSessionQuizOptions(List<QuizAnswer> quizAnswers);

}
