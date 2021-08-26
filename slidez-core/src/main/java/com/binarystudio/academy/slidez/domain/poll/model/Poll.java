package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.interactive_element.model.InteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll")
@PrimaryKeyJoinColumn(name = "interactive_element_id", referencedColumnName = "id")
public class Poll extends InteractiveElement {

    private static final long serialVersionUID = 7364567818837L;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "is_multi", nullable = false)
	private Boolean isMulti;

	@Column(name = "is_template", nullable = false)
	private Boolean isTemplate;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "poll_id", referencedColumnName = "id", nullable = false)
	private List<PollOption> options;

}
