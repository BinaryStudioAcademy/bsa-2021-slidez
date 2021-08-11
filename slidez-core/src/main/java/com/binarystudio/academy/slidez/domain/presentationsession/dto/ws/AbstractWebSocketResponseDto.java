package com.binarystudio.academy.slidez.domain.presentationsession.dto.ws;

import com.binarystudio.academy.slidez.domain.presentationsession.enums.WebSocketStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractWebSocketResponseDto {

	private WebSocketStatus status = WebSocketStatus.OK;

}
