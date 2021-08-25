package com.binarystudio.academy.slidez.domain.interactive_element.mapper;

import com.binarystudio.academy.slidez.domain.interactive_element.dto.InteractiveElementDto;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InteractiveElementMapper {

	InteractiveElementMapper INSTANCE = Mappers.getMapper(InteractiveElementMapper.class);

	InteractiveElementDto presentationInteractiveElementToDto(InteractiveElement interactiveElement);

}
