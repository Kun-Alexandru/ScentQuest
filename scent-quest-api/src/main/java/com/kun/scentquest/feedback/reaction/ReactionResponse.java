package com.kun.scentquest.feedback.reaction;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ReactionResponse (

        @NotNull(message = "Type should not be empty")
        @NotEmpty(message = "Type should not be empty")
        @NotBlank(message = "Type should not be empty")
        String type,
        @NotNull(message = "Fragrance id should not be empty")
        Integer fragranceId
) {}
