package com.binarystudio.academy.slidez.domain.poll.dto;

import com.binarystudio.academy.slidez.domain.poll.model.PollOption;
import com.binarystudio.academy.slidez.domain.presentationiteractiveelement.model.PresentationInteractiveElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class PollResponseDto {

    private UUID id;

    private String name;

    private boolean isMulti;

    private boolean isTemplate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<PollOption> options;

    private PresentationInteractiveElement owner;

}
