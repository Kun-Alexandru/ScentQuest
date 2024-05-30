package com.kun.scentquest.feedback.review;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.feedback.review.ReviewFragranceResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("reviews")
@RequiredArgsConstructor
@Tag(name = "review", description = "The review API")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Integer> saveReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(reviewService.save(request, connectedUser));
    }

    @GetMapping("/fragrance/{fragranceId}")
    public ResponseEntity<PageResponse<ReviewResponse>> reviewsByFragrance(
            @PathVariable("fragranceId") Integer fragranceId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(reviewService.getAllByFragrance(fragranceId, page, size, connectedUser));
    }

    @GetMapping("fragrance/{fragranceId}/owner")
    public ResponseEntity<ReviewResponse> getReviewById(
            @PathVariable("fragranceId") Integer reviewId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(reviewService.getReviewByFragranceId(reviewId, connectedUser));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable("reviewId") Integer reviewId,
            Authentication connectedUser
    ) {
        reviewService.deleteReview(reviewId, connectedUser);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("")
    public ResponseEntity<Void> updateReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication connectedUser
    ) {
        reviewService.updateReview(request, connectedUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/fragrance/{fragranceId}/reviws")
    public ResponseEntity<PageResponse<ReviewFragranceResponse>> findAllReviewsByFragId(
            @PathVariable("fragranceId") Integer fragranceId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(reviewService.getAllReviewsByFragranceId(fragranceId, page, size));
    }

}
