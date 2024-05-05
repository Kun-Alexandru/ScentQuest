package com.kun.scentquest.feedback;

import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import com.kun.scentquest.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Reaction {
    @Id
    @GeneratedValue
    private Integer Id;

    @ManyToOne
    @JoinColumn(name = "FragranceId")
    private Fragrance fragrance;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @Column
    private String type;
}