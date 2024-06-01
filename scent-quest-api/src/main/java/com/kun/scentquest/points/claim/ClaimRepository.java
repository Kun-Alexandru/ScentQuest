package com.kun.scentquest.points.claim;
import com.kun.scentquest.users.role.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {
    List<Claim> findByUserAndClaimDate(User user, LocalDate claimDate);




    @Query("""
            SELECT c FROM Claim c
            WHERE c.user.id = :userId
            """)
    Page<Claim> findAllClaimsByUserId(Pageable pageable, @Param("userId") Integer userId);

}
