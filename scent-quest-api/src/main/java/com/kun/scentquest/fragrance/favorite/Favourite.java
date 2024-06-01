package com.kun.scentquest.fragrance.favorite;

import com.kun.scentquest.fragrance.fragrance.Fragrance;
import com.kun.scentquest.users.role.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Favourite {

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
