package com.kun.scentquest.fragrance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kun.scentquest.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Note {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;
    private String aromaProfile;
    private String intensityLevel;

    @ManyToMany(mappedBy = "notes")
    @JsonIgnore
    private List<Fragrance> fragrances;

}
