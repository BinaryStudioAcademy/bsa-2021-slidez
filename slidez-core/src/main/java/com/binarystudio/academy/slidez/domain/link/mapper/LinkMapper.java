package com.binarystudio.academy.slidez.domain.link.mapper;

import com.binarystudio.academy.slidez.domain.link.dto.LinkDto;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LinkMapper {

	LinkMapper INSTANCE = Mappers.getMapper(LinkMapper.class);

	@Mappings({ @Mapping(source = "link.linkId", target = "linkId"),
			@Mapping(source = "link.expirationDate", target = "expirationDate"),
			@Mapping(source = "link.link", target = "link"),
			@Mapping(source = "link.session.id", target = "sessionId") })
	LinkDto linkToLinkDto(Link link);

}
