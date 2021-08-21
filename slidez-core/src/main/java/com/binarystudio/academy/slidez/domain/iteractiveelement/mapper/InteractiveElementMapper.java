package com.binarystudio.academy.slidez.domain.iteractiveelement.mapper;

import com.binarystudio.academy.slidez.domain.iteractiveelement.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.iteractiveelement.model.InteractiveElement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InteractiveElementMapper {

	InteractiveElementMapper INSTANCE = Mappers.getMapper(InteractiveElementMapper.class);

	InteractiveElementDto presentationInteractiveElementToDto(InteractiveElement interactiveElement);

	InteractiveElement dtoToPresentationInteractiveElement(InteractiveElementDto interactiveElementDto);

}
