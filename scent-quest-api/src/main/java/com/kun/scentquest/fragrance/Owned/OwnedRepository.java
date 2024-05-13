package com.kun.scentquest.fragrance.Owned;

import com.kun.scentquest.fragrance.Favorite.Favourite;
import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface OwnedRepository extends JpaRepository<Owned, Integer> {

    @Query("""
            SELECT o FROM Owned o
            WHERE o.user.id = :UserId
            """)
    List<Owned> findAllByUserId(@Param("UserId") Integer userId);


    @Query("""
        SELECT o FROM Owned o
        WHERE o.fragrance.FragranceId = :fragranceId AND o.user.id = :userId
        """)

    Optional<Owned> findAllByFragranceIdAndUserId(@Param("fragranceId") Integer fragranceId, @Param("userId") Integer userId);


    @Query("""
            SELECT (Count(*) > 0) AS isAlreadyOwned
            FROM Owned o
            WHERE o.fragrance.FragranceId = :fragranceId AND o.user.id = :userId
            """)

    boolean isAlreadyOwned(@Param("fragranceId") Integer fragranceId, @Param("userId") Integer userId);


    @Query("""
            SELECT o.fragrance FROM Owned o
            WHERE o.user.id = :userId AND
            o.fragrance.recommendedSeason LIKE CONCAT('%', :season, '%') AND
            (LOWER(o.fragrance.name) LIKE CONCAT('%', LOWER(:searchWord), '%') OR
            LOWER(o.fragrance.brand) LIKE CONCAT('%', LOWER(:searchWord), '%'))
            """)
    Page<Fragrance> findAllOwnedFragrancesByUserId(Pageable pageable, @Param("userId") Integer userId, @Param("season") String season, @Param("searchWord") String searchWord);
}
