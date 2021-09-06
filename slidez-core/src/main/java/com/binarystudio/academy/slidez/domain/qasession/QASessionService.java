package com.binarystudio.academy.slidez.domain.qasession;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import com.binarystudio.academy.slidez.domain.poll.dto.PollDto;
import com.binarystudio.academy.slidez.domain.poll.mapper.PollMapper;
import com.binarystudio.academy.slidez.domain.poll.model.Poll;
import com.binarystudio.academy.slidez.domain.presentation.PresentationService;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.qasession.dto.CreateQASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.dto.QASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.exception.QASessionNotFoundException;
import com.binarystudio.academy.slidez.domain.qasession.mapper.QASessionMapper;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class QASessionService {

	private final PresentationService presentationService;

	private final QASessionRepository qaSessionRepository;

	@Autowired
	public QASessionService(PresentationService presentationService, QASessionRepository qaSessionRepository) {
		this.presentationService = presentationService;
		this.qaSessionRepository = qaSessionRepository;
	}

	@Transactional
	public QASessionDto create(CreateQASessionDto dto, User owner) {
		Presentation presentation = presentationService.assertPresentationExists(dto.getPresentationLink(), owner);

		QASession qaSession = new QASession();
		InteractiveElement interactiveElement = new InteractiveElement();
		interactiveElement.setPresentation(presentation);
		interactiveElement.setSlideId(dto.getSlideId());
		interactiveElement.setType(InteractiveElementType.QASession);

		qaSession.setInteractiveElement(interactiveElement);
		qaSession.setOwner(owner);
		qaSession.setTitle(dto.getTitle());

		QASession out = qaSessionRepository.save(qaSession);
		return QASessionMapper.INSTANCE.qaSessionToDto(out);
	}

    @Transactional
    public void remove(UUID id) {
        qaSessionRepository.deleteById(id);
    }

	public Optional<QASession> getBySlideId(String slideId) {
		return qaSessionRepository.getBySlideId(slideId);
	}

	public Optional<QASession> getBySessionShortLink(String shortCode)
			throws PresentationNotFoundException, QASessionNotFoundException {
		Presentation presentation = presentationService.getPresentationByShortCode(shortCode);
		return presentation.getInteractiveElements().stream()
				.filter(e -> Objects.equals(e.getType(), InteractiveElementType.QASession)).findAny()
				.map(InteractiveElement::getQaSession);
	}

    public Optional<QASessionDto> getQASessionDtoById(UUID id) {
        Optional<QASession> qaSessionOptional = qaSessionRepository.findById(id);
        if (qaSessionOptional.isEmpty()) {
            return Optional.empty();
        }
        QASessionDto out = QASessionMapper.INSTANCE.qaSessionToDto(qaSessionOptional.get());
        return Optional.of(out);
    }

}
