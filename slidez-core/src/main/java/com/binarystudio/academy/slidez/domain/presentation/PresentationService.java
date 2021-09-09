package com.binarystudio.academy.slidez.domain.presentation;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.exception.IllegalElementTypeException;
import com.binarystudio.academy.slidez.domain.interactive_element.mapper.InteractiveElementMapper;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationDTO;
import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationSessionDTO;
import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.exception.PresentationNotFoundException;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.session.SessionRepository;
import com.binarystudio.academy.slidez.domain.session.exception.SessionNotFoundException;
import com.binarystudio.academy.slidez.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PresentationService {

    private final PresentationRepository presentationRepository;

    private final SessionRepository sessionRepository;

    @Autowired
    public PresentationService(PresentationRepository presentationRepository, SessionRepository sessionRepository) {
        this.presentationRepository = presentationRepository;
        this.sessionRepository = sessionRepository;
    }

    /**
     * Fetches presentation or creates a new presentation if it doesn't exists
     */

    public Presentation assertPresentationExists(String presentationLink, String presentationName, User owner) {
        return this.presentationRepository.findByLink(presentationLink).orElseGet(() -> {
            var newPresentation = new Presentation();
            newPresentation.setLink(presentationLink);
            newPresentation.setName(presentationName);
            newPresentation.setUser(owner);
            return presentationRepository.save(newPresentation);
        });
    }

    public List<PresentationDTO> getPresentationInfo() {
        var presentations = this.presentationRepository.findAll();
        ArrayList<PresentationDTO> presentationList = new ArrayList<>();
        for (Presentation p :
            presentations) {
            presentationList.add(new PresentationDTO(p.getId(), p.getName(), p.getUpdatedAt().toString()));
        }
        return presentationList;
    }

    public Optional<Presentation> get(UUID id) {
        return presentationRepository.findById(id);
    }

    public Optional<Presentation> getByLink(String id) {
        return presentationRepository.findByLink(id);
    }

    public PresentationSessionDTO getActivePresentationSessionData(String presentationLink) {
        // Maybe find presentation
        var presentation = this.presentationRepository.findByLink(presentationLink)
            .orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

        // And Maybe find an active session
        var activeSessions = this.sessionRepository.getActiveSessionForPresentation(presentation.getId());

        if (activeSessions.size() <= 0) {
            throw new SessionNotFoundException("No active session found");
        }

        var activeSession = activeSessions.get(0);

        // And if it is present - create a DTO
        return PresentationSessionDTO.of(presentation, activeSession);
    }

    public Presentation update(PresentationUpdateDto dto) {
        presentationRepository.update(dto);
        return presentationRepository.getById(dto.getId());
    }

    public void remove(UUID id) {
        presentationRepository.deleteById(id);
    }

    public Collection<InteractiveElementDto> getInteractiveElementDtos(String presentationLink)
        throws IllegalElementTypeException, IllegalStateException {
        Presentation presentation = this.presentationRepository.findByLink(presentationLink)
            .orElseThrow(() -> new PresentationNotFoundException(
                String.format("Not found presentation with link %s", presentationLink)));
        Set<InteractiveElement> presentationInteractiveElements = presentation.getInteractiveElements();
        InteractiveElementMapper mapper = InteractiveElementMapper.INSTANCE;
        return presentationInteractiveElements.stream().map(mapper::interactiveElementToTypeRelatedDto)
            .collect(Collectors.toList());
    }

    public Presentation getPresentationByShortCode(String shortCode) throws PresentationNotFoundException {
        return presentationRepository.findByShortCode(shortCode).orElseThrow(() -> new PresentationNotFoundException(
            String.format("No presentation corresponds to short code %s", shortCode)));
    }

}
