package com.binarystudio.academy.slidez.domain.presentationiteractiveelement.mapper;

import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.dto.PresentationInteractiveElementDto;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PresentationInteractiveElementMapper {

	PresentationInteractiveElementMapper INSTANCE = Mappers.getMapper(PresentationInteractiveElementMapper.class);

	PresentationInteractiveElementDto presentationInteractiveElementToDto(
			PresentationInteractiveElement presentationInteractiveElement);

	PresentationInteractiveElement dtoToPresentationInteractiveElement(
			PresentationInteractiveElementDto presentationInteractiveElementDto);

}
