package com.kun.scentquest.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CouponsRepository extends JpaRepository<Coupons, Integer> {

    @Query("""
            SELECT c FROM Coupons c
            WHERE c.userId = :userId
            ORDER BY c.id DESC
            """)
    Page<Coupons> findAllCouponsByUserId(Pageable pageable, @Param("userId") Integer userId);

}
