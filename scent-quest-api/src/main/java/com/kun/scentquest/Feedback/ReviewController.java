package com.kun.scentquest.Feedback;

import com.kun.scentquest.common.PageResponse;
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

}
