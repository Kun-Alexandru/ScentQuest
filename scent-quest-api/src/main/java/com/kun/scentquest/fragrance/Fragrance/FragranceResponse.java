package com.kun.scentquest.fragrance.Fragrance;

import lombok.*;

import java.time.LocalDate;

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
    private LocalDate releaseDate;
    private double averageRating;
    private boolean discontinued;
    private Integer number_of_likes;
    private String gender;
    private String concentration;
    private Integer number_of_dislikes;

}
