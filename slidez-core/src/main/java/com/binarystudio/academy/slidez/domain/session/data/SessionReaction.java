package com.binarystudio.academy.slidez.domain.session.data;

import com.binarystudio.academy.slidez.domain.session.enums.SessionReactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class SessionReaction extends SessionInteractiveElement {

	private String username;

	private SessionReactionType reactionType;

}
