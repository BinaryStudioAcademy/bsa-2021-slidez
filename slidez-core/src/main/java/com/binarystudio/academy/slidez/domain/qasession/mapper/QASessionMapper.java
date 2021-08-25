package com.binarystudio.academy.slidez.domain.qasession.mapper;

import com.binarystudio.academy.slidez.domain.qasession.dto.QASessionDto;
import com.binarystudio.academy.slidez.domain.qasession.model.QASession;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QASessionMapper {

	QASessionMapper INSTANCE = Mappers.getMapper(QASessionMapper.class);

	QASessionDto qaSessionToDto(QASession session);

}
