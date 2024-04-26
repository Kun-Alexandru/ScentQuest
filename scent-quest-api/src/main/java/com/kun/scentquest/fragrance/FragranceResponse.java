package com.kun.scentquest.fragrance;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FragranceResponse {


    private Integer FragranceId;
    private String name;
    private String brand;
    private String recommendedSeason;
    private String shortDescription;
    private String adder;
    private byte[] picture;
    private double averageRating;
    private boolean discontinued;

}
