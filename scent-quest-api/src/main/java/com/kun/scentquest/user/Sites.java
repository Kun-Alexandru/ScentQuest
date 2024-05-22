package com.kun.scentquest.user;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sites")
public class Sites {

    @Id
    @GeneratedValue
    private Integer id;
    private String site;
    private Integer discount;
    private Integer price;

}
