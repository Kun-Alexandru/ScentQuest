package com.kun.scentquest.feedback.review;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {

    private Integer id;
    private String text;
    private Integer rating;

}
