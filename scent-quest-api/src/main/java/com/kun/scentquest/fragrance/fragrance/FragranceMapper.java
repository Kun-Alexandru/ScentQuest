package com.kun.scentquest.fragrance.fragrance;

import com.kun.scentquest.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class FragranceMapper {
    public Fragrance toFragrance(FragranceRequest request) {
        return Fragrance.builder()
                .FragranceId(request.FragranceId())
                .name(request.name())
                .brand(request.brand())
                .recommendedSeason(request.recommendedSeason())
                .shortDescription(request.shortDescription())
                .discontinued(request.discontinued())
                .releaseDate(request.releaseDate())
                .number_of_likes(request.number_of_likes())
                .gender(request.gender())
                .concentration(request.concentration())
                .number_of_dislikes(request.number_of_dislikes())
                .build();
    }

    public FragranceResponse toFragranceResponse(Fragrance fragrance) {
        return FragranceResponse.builder()
                .FragranceId(fragrance.getFragranceId())
                .name(fragrance.getName())
                .brand(fragrance.getBrand())
                .recommendedSeason(fragrance.getRecommendedSeason())
                .shortDescription(fragrance.getShortDescription())
                .discontinued(fragrance.getDiscontinued())
                .adder(fragrance.getAdder().getFullName())
                .releaseDate(fragrance.getReleaseDate())
                .averageRating(fragrance.getRate())
                .picture(FileUtils.readFileFromLocation(fragrance.getPicture()))
                .number_of_likes(fragrance.getNumber_of_likes())
                .concentration(fragrance.getConcentration())
                .gender(fragrance.getGender())
                .number_of_dislikes(fragrance.getNumber_of_dislikes())
                .build();
    }
}
