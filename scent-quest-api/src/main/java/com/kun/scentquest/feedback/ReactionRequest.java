package com.kun.scentquest.feedback;

import jakarta.validation.constraints.*;

public record ReactionRequest (

        @NotNull(message = "Type should not be empty")
    @NotEmpty(message = "Type should not be empty")
    @NotBlank(message = "Type should not be empty")
    String type,
    @NotNull(message = "User id should not be empty")
    Integer userId,
    @NotNull(message = "Fragrance id should not be empty")
    Integer fragranceId
    ) {}
