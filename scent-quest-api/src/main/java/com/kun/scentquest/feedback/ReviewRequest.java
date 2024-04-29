package com.kun.scentquest.feedback;

import jakarta.validation.constraints.*;

public record ReviewRequest (
        @Positive(message = "200")
        @Min(value = 0, message = "201")
        @Max(value = 5, message = "202")
        Integer rating,
        @NotNull(message = "203")
        @NotEmpty(message = "203")
        @NotBlank(message = "203")
        String text,
        @NotNull(message = "204")
        Integer fragranceId
){
}
