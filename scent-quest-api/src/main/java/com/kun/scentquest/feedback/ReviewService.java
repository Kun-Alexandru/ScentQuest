package com.kun.scentquest.feedback;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.fragrance.Fragrance;
import com.kun.scentquest.fragrance.FragranceRepository;
import com.kun.scentquest.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FragranceRepository fragranceRepository;
    private final ReviewMapper reviewMapper;

    public Integer save(ReviewRequest request, Authentication connectedUser) {

        Fragrance fragrance = fragranceRepository.findById(request.fragranceId())
                .orElseThrow(() -> new RuntimeException("Fragrance not found with ID::" + request.fragranceId()));

        User user = (User) connectedUser.getPrincipal();
        Review review = reviewMapper.toReview(request);
        return reviewRepository.save(review).getId();
    }

    public PageResponse<ReviewResponse> getAllByFragrance(Integer fragranceId, int page, int size, Authentication connectedUser) {

        Pageable pageable = PageRequest.of(page, size);
        User user = (User) connectedUser.getPrincipal();
        Page<Review> reviews = reviewRepository.findAllByFragranceId(fragranceId, pageable);
        List<ReviewResponse> reviewsResponse = reviews.stream()
                .map(f -> reviewMapper.toReviewResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                reviewsResponse,
                reviews.getNumber(),
                reviews.getSize(),
                reviews.getTotalElements(),
                reviews.getTotalPages(),
                reviews.isFirst(),
                reviews.isLast()
        );
    }
}
