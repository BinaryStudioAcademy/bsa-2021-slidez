package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElementType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "poll")
public class Poll extends InteractiveElement {

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "is_multi", nullable = false)
	private Boolean isMulti;

	@Column(name = "is_template", nullable = false)
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JoinColumn(name = "poll_id", referencedColumnName = "id", nullable = false)
	private List<PollOption> options;

	public Poll() {
		super(null, InteractiveElementType.POLL, null, null);
	}

}
