package com.kun.scentquest.feedback;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import com.kun.scentquest.fragrance.Fragrance.FragranceRepository;
import com.kun.scentquest.user.User;
import com.kun.scentquest.user.UserMapper;
import com.kun.scentquest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FragranceRepository fragranceRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

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

    public ReviewResponse getReviewByFragranceId(Integer fragranceId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Review review = reviewRepository.findByFragranceIdAndReviewId(fragranceId, user.getId())
                .orElseThrow(() -> new RuntimeException("Review not 3 found with ID::" + fragranceId));
        return reviewMapper.toReviewResponse(review, user.getId());
    }

    public void deleteReview(Integer reviewId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not 2 found with ID::" + reviewId));
        if (!review.getCreatedBy().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to delete this review");
        }
        reviewRepository.delete(review);
    }

    public void updateReview(ReviewRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Review review = reviewRepository.findByFragranceIdAndReviewId(request.fragranceId(), user.getId())
                        .orElseThrow(() -> new RuntimeException("Review not found with 1 ID::" + request.fragranceId()));
        review.setText(request.text());
        review.setRating(request.rating());
        reviewRepository.save(review);
    }

    public PageResponse<ReviewFragranceResponse> getAllReviewsByFragranceId(Integer fragranceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        Page<Review> reviews = reviewRepository.findAllReviewByFragranceId(fragranceId, pageable);
        List<ReviewFragranceResponse> reviewsResponse = reviews.stream()
                .map(f -> ReviewFragranceResponse.builder()
                        .id(f.getId())
                        .rating(f.getRating())
                        .text(f.getText())
                        .createdDate(f.getCreatedAt())
                        .createdBy(f.getCreatedBy())
                        .modifiedBy(f.getModifiedBy())
                        .modifiedAt(f.getModifiedAt())
                        .creator(UserMapper.toUserResponse(userRepository.findById(f.getCreatedBy()).orElseThrow()))
                        .build()
                )
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
