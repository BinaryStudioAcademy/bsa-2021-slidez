package com.binarystudio.academy.slidez.domain.session.handler;

import com.binarystudio.academy.slidez.app.session.SessionResponseCodes;
import com.binarystudio.academy.slidez.domain.session.PresentationEventStore;
import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;

import javax.annotation.OverridingMethodsMustInvokeSuper;

public abstract class AbstractDomainEventHandler implements DomainEventHandler {

	private volatile DomainEventHandler next;

	/**
	 * Method is designed to chain event handlers
	 * @param next - Handler that will be next in chain
	 * @return {@link DomainEventHandler} next element in chain
	 */
	@Override
	public DomainEventHandler setNext(DomainEventHandler next) {
		this.next = next;
		return next;
	}

	/**
	 * Method delegates handling event to next handler in chain or returns null
	 * @return result of handling by next event handler or null if
	 * {@link AbstractDomainEventHandler#next} is null
	 */
	@Override
	@OverridingMethodsMustInvokeSuper
	public GenericResponse<Object, SessionResponseCodes> handle(DomainEvent domainEvent,
			PresentationEventStore presentationEventStore) {
		final DomainEventHandler nextCopy = next;
		if (nextCopy != null) {
			nextCopy.handle(domainEvent, presentationEventStore);
		}
		return null;
	}

}
