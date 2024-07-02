package com.kun.scentquest.feedback.review;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.file.FileUtils;
import com.kun.scentquest.fragrance.fragrance.FragranceRepository;
import com.kun.scentquest.points.claim.Claim;
import com.kun.scentquest.points.claim.ClaimRepository;
import com.kun.scentquest.users.user.User;
import com.kun.scentquest.users.user.UserMapper;
import com.kun.scentquest.users.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FragranceRepository fragranceRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ClaimRepository claimRepository;

    public Integer save(ReviewRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate claimDate = LocalDate.parse(currentDate.format(formatter));
        user.setPoints(user.getPoints() + 3);
        Claim claim = Claim.builder()
                .user(user)
                .claimDate(claimDate)
                .type("Review points")
                .fragName(fragranceRepository.findById(request.fragranceId()).orElseThrow().getName())
                .points(3)
                .build();
        claimRepository.save(claim);
        userRepository.save(user);
        Review review = ReviewMapper.toReview(request);
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

    public PageResponse<ReviewResponsePicture> getAllReviewByUser(Integer userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        Page<Review> reviews = reviewRepository.findAllReviewByCreatedAt(userId, pageable);

        List<ReviewResponsePicture> reviewResponse = reviews.stream()
                .map(f -> ReviewResponsePicture.builder()
                        .id(f.getId())
                        .rating(f.getRating())
                        .text(f.getText())
                        .createdDate(f.getCreatedAt())
                        .createdBy(f.getCreatedBy())
                        .modifiedBy(f.getModifiedBy())
                        .modifiedAt(f.getModifiedAt())
                        .fragranceId(f.getFragrance().getFragranceId())
                        .fragranceName(f.getFragrance().getName())
                        .fragrancePicture(FileUtils.readFileFromLocation(f.getFragrance().getPicture()))
                        .build()
                )
                .toList();

        return new PageResponse<>(
                reviewResponse,
                reviews.getNumber(),
                reviews.getSize(),
                reviews.getTotalElements(),
                reviews.getTotalPages(),
                reviews.isFirst(),
                reviews.isLast()
        );
    }

}
