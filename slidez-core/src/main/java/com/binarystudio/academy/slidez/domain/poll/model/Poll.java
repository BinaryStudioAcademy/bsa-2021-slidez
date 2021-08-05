package com.binarystudio.academy.slidez.domain.poll.model;

import com.binarystudio.academy.slidez.domain.poll.dto.CreatePollDto;
import com.binarystudio.academy.slidez.domain.poll.option.model.PollOption;
import com.binarystudio.academy.slidez.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PollOption> options = new ArrayList<>();

    public static Poll fromDto(CreatePollDto poll, User user) {
        return Poll.builder()
            .name(poll.getName())
            .createdAt(poll.getCreateAt())
            .updatedAt(poll.getUpdatedAt())
            .user(user)
            .build();
    }
}
