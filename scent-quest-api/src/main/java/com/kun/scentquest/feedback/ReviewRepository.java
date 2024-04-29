package com.kun.scentquest.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("""
            SELECT r FROM Review r 
            WHERE r.fragrance.FragranceId = :fragranceId
            """)
    Page<Review> findAllByFragranceId(Integer fragranceId, Pageable pageable);
}