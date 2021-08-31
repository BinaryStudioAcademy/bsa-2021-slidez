package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll")
public class Poll {

	private static final long serialVersionUID = 7364567818837L;

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
	private UUID id;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "interactive_element_id")
	private InteractiveElement interactiveElement;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "is_multi", nullable = false)
	private Boolean isMulti;

	@Column(name = "is_template", nullable = false)
	private Boolean isTemplate;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "poll_id", referencedColumnName = "id", nullable = false)
	private List<PollOption> options = new ArrayList<>();

}
