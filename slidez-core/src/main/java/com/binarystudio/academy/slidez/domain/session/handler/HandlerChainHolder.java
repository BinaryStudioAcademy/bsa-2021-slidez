package com.binarystudio.academy.slidez.domain.session.handler;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class HandlerChainHolder implements ApplicationContextAware {

	private ApplicationContext applicationContext;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

	@Bean
	public AbstractDomainEventHandler eventHandler() {
		SnapshotRequestHandler snapshotRequestHandler = applicationContext.getBean("snapshotRequestHandler",
				SnapshotRequestHandler.class);
		StartPollHandler startPollHandler = applicationContext.getBean("startPollHandler", StartPollHandler.class);
		AnswerPollHandler answerPollHandler = applicationContext.getBean("answerPollHandler", AnswerPollHandler.class);
		DefaultEventHandler defaultEventHandler = applicationContext.getBean("defaultEventHandler",
				DefaultEventHandler.class);
		StartQuizEventHandler startQuizEventHandler = applicationContext.getBean("startQuizEventHandler",
				StartQuizEventHandler.class);
		AnswerQuizEventHandler answerQuizEventHandler = applicationContext.getBean("answerQuizEventHandler",
				AnswerQuizEventHandler.class);
		snapshotRequestHandler.setNext(startPollHandler).setNext(answerPollHandler).setNext(startQuizEventHandler)
				.setNext(answerQuizEventHandler).setNext(defaultEventHandler);
		return snapshotRequestHandler;
	}

}
