package com.binarystudio.academy.slidez.domain.qasession.mapper;

import com.binarystudio.academy.slidez.domain.qasession.dto.QASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QASessionMapper {

	QASessionMapper INSTANCE = Mappers.getMapper(QASessionMapper.class);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "interactiveElement.type", target = "type"),
			@Mapping(source = "interactiveElement.slideId", target = "slideId"),
			@Mapping(source = "title", target = "title"), @Mapping(source = "owner.id", target = "ownerId") })
	QASessionDto qaSessionToDto(QASession session);

}
