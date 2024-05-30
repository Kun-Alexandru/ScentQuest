package com.kun.scentquest.feedback.review;

import com.kun.scentquest.feedback.review.Review;
import com.kun.scentquest.fragrance.fragrance.Fragrance;
import org.springframework.stereotype.Service;

@Service
public class ReviewMapper {
    public static Review toReview(ReviewRequest reviewRequest) {
        return Review.builder()
                .rating(reviewRequest.rating())
                .text(reviewRequest.text())
                .fragrance(Fragrance.builder()
                        .FragranceId(reviewRequest.fragranceId())
                        .build()
                )
                .build();
    }

    public ReviewResponse toReviewResponse(Review review, Integer id) {
        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .text(review.getText())
                .build();
    }
}
