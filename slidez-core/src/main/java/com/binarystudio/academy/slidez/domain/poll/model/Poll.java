package com.binarystudio.academy.slidez.domain.poll.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.*;

import com.binarystudio.academy.slidez.domain.poll.option.model.PollOption;
import com.binarystudio.academy.slidez.user.model.User;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "polls")
public class Poll {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column
    private String name;

    @Column
    private Date createdAt;

    @Column
    private Date updatedAt;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    private List<PollOption> options = new ArrayList<>();

}
