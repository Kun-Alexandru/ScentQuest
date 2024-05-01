package com.kun.scentquest.fragrance.Perfumer;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PerfumerResponse {

    Integer id;
    String country;
    private LocalDate dateOfBirth;
    String name;
    String shortDescription;

}