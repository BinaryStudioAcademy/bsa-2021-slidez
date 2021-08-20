package com.binarystudio.academy.slidez.domain.presentation_iteractive_element;

import com.binarystudio.academy.slidez.domain.presentation.PresentationRepository;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElement;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElementType;
import com.binarystudio.academy.slidez.infrastructure.external_slide_service.GoogleSlidesExternalPresentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PresentationInteractiveElementCreator {
    PresentationRepository presentationRepository;
    PresentationInteractiveElementRepository ieRepository;
    GoogleSlidesExternalPresentationService externalPresentationService;

    @Autowired
    public PresentationInteractiveElementCreator(
        PresentationRepository presentationRepository,
        PresentationInteractiveElementRepository ieRepository,
        GoogleSlidesExternalPresentationService externalPresentationService
    ){
        this.ieRepository = ieRepository;
        this.presentationRepository = presentationRepository;
        this.externalPresentationService = externalPresentationService;
    }

    public PresentationInteractiveElement forPoll(String presentationLink, UUID userId, String pollTitle){
        try {
            var presentation = assertPresentationExists(presentationLink);
            var slideId = this.externalPresentationService.createSlide(
                userId,
                presentationLink,
                PresentationInteractiveElement.generatePresentationSlideId(UUID.randomUUID()),
                "Poll: " + pollTitle
            );
            var pe = PresentationInteractiveElement
                .builder()
                .type(PresentationInteractiveElementType.POLL)
                //.presentation(presentation)
                .slideId(slideId).build();

            return this.ieRepository.save(pe);
        } catch(Exception exception){
            throw new RuntimeException(exception.getMessage());
        }
    }

    private Presentation assertPresentationExists(String presentationLink){
        return this.presentationRepository
            .findByLink(presentationLink)
            .orElseGet(() -> this.presentationRepository
                .save(
                    Presentation
                        .builder()
                        .link(presentationLink)
                        .name("Test presentation")
                        .build()
                )
        );
    }
}
