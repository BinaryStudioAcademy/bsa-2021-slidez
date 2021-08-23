package com.binarystudio.academy.slidez.domain.presentation_iteractive_element.mapper;

import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.dto.PresentationInteractiveElementDto;
import com.binarystudio.academy.slidez.domain.presentation_iteractive_element.model.PresentationInteractiveElement;
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
