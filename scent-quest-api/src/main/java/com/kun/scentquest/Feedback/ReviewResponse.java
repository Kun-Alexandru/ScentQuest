package com.kun.scentquest.Feedback;

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
