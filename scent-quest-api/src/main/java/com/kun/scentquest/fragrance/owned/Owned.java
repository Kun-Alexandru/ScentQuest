package com.kun.scentquest.fragrance.owned;

import com.kun.scentquest.fragrance.fragrance.Fragrance;
import com.kun.scentquest.users.user.User;
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
