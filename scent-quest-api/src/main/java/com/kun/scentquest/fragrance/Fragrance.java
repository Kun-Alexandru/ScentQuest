package com.kun.scentquest.fragrance;

import com.kun.scentquest.feedback.Reaction;
import com.kun.scentquest.feedback.Review;
import com.kun.scentquest.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Fragrance {

    @Id
    @GeneratedValue
    private Integer FragranceId;

    private String name;
    private String brand;
    private String recommendedSeason;
    private String shortDescription;
    private String picture;
    private boolean discontinued;
    private LocalDate releaseDate;
    private Integer number_of_likes;

    @ManyToOne
    @JoinColumn(name = "adder_id")
    private User adder;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Note> notes;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Perfumer> perfumers;

    @OneToMany(mappedBy = "fragrance")
    private List<Review> reviews;

    @OneToMany(mappedBy = "fragrance")
    private List<Reaction> reactions;


    @Transient
    public double getRate() {
        if (reviews == null || reviews.isEmpty()) {
            return 0.0;
        }
        var rate = this.reviews.stream()
                .mapToInt(review -> review.getRating())
                .average()
                .orElse(0.0);


        // Return 4.0 if roundedRate is less than 4.5, otherwise return 4.5
        return Math.round(rate * 10.0) / 10.0;
    }

    public boolean getDiscontinued() {
        return discontinued;
    }
}
