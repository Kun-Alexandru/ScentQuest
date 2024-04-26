package com.kun.scentquest.fragrance;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record FragranceRequest(
        Integer FragranceId,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String name,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String brand,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String recommendedSeason,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        String shortDescription,
        @NotNull(message = "104")
        @NotEmpty(message = "104")
        boolean discontinued,
        @NotNull(message = "105")
        @NotEmpty(message = "105")
        LocalDate releaseDate

) {
}
