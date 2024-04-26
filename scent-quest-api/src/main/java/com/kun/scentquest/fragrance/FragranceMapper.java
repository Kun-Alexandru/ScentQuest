package com.kun.scentquest.fragrance;

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
                .averageRating(fragrance.getRate())
                .picture(FileUtils.readFileFromLocation(fragrance.getPicture()))
                .build();
    }
}
