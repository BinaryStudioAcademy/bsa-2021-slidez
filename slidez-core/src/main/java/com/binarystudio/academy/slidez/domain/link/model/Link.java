package com.binarystudio.academy.slidez.domain.link.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.binarystudio.academy.slidez.domain.session.model.Session;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Long linkId;

	@OneToOne
	@JoinColumn(name = "session_id", referencedColumnName = "id")
	private Session session;

	@Column(name = "link")
	private String link;

	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;

}
