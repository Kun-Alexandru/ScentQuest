package com.kun.scentquest.feedback.review;

import com.kun.scentquest.feedback.review.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("""
            SELECT r FROM Review r 
            WHERE r.fragrance.FragranceId = :fragranceId
            """)
    Page<Review> findAllByFragranceId(Integer fragranceId, Pageable pageable);

    @Query("""
            SELECT r FROM Review r 
            WHERE r.fragrance.FragranceId = :fragranceId
            AND r.createdBy = :ownerId
            """)
    Optional<Review> findByFragranceIdAndReviewId(Integer fragranceId, Integer ownerId);

    @Query("""
            SELECT r FROM Review r 
            WHERE r.fragrance.FragranceId = :fragranceId
            """)
    Page<Review> findAllReviewByFragranceId(Integer fragranceId, Pageable pageable);

    @Query("""
            SELECT r FROM Review r 
            WHERE r.createdBy = :userId
            """)
    Page<Review> findAllReviewByCreatedAt(Integer userId, Pageable pageable);


    @Query("""
            DELETE FROM Review r 
            WHERE r.fragrance.FragranceId = :fragranceId
            """)
    @Modifying
    void deleteByFragrance_FragranceId(Integer fragranceId);
}