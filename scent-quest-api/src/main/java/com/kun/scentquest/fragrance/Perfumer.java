package com.kun.scentquest.fragrance;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Perfumer {

    @Id
    @GeneratedValue
    private Integer Id;
    private String name;
    private String country;
    private LocalDate dateOfBirth;

    @ManyToMany(mappedBy = "perfumers")
    @JsonIgnore
    private List<Fragrance> fragrances;

}
