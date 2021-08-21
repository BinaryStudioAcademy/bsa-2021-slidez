package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.iteractiveelement.model.InteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll")
public class Poll extends InteractiveElement {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "is_multi", nullable = false)
	private Boolean isMulti;

	@Column(name = "is_template", nullable = false)
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "poll_id", referencedColumnName = "id", nullable = false)
	private List<PollOption> options;

}
