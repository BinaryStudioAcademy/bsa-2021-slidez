package com.binarystudio.academy.slidez.domain.presentation.mapper;

import com.binarystudio.academy.slidez.domain.presentation.dto.PresentationUpdateDto;
import com.binarystudio.academy.slidez.domain.presentation.model.Presentation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PresentationMapper {

	PresentationMapper INSTANCE = Mappers.getMapper(PresentationMapper.class);

	@Mappings({ @Mapping(target = "id", source = "presentation.id"),
			@Mapping(target = "updatedAt", source = "presentation.updatedAt"),
			@Mapping(target = "link", source = "presentation.link"),
			@Mapping(target = "name", source = "presentation.name") })
	PresentationUpdateDto presentationToPresentationUpdateDto(Presentation presentation);

}
