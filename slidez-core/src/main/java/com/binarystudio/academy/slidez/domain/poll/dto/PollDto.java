package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollDto {

    private UUID id;

    private String name;

    private boolean isMulti;

    private boolean isTemplate;

    private Date createdAt;

    private Date updatedAt;

    private List<PollOption> options;

    private PresentationInteractiveElement owner;
}
