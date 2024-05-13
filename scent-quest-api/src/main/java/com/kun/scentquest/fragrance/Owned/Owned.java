package com.kun.scentquest.fragrance.Owned;

import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import com.kun.scentquest.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Owned {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "FragranceId")
    private Fragrance fragrance;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;
}
