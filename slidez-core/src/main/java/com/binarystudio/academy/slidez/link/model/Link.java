package com.binarystudio.academy.slidez.link.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Long linkId;

	@Column(name = "session_id")
	private UUID sessionId;

	@Column(name = "link")
	private String link;

	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;

	public static Link createLink(UUID sessionId, String link, LocalDateTime expirationDate) {
		return Link.builder().sessionId(sessionId).link(link).expirationDate(expirationDate).build();
	}

}
