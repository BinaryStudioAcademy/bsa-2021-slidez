package com.binarystudio.academy.slidez.domain.session.event;

import com.binarystudio.academy.slidez.domain.exception.DomainException;
import com.binarystudio.academy.slidez.domain.session.data.SessionQASession;
import com.binarystudio.academy.slidez.domain.session.data.State;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StartQASessionEvent extends DomainEvent {

    private String shortCode;

	private SessionQASession sessionQASession;

    public StartQASessionEvent(String shortCode) {
        this.shortCode = shortCode;
    }

    @Override
	public void applyEvent(State state) throws DomainException {
		state.setCurrentQASession(sessionQASession);
	}

}
