package com.kun.scentquest.fragrance.favorite;

import com.kun.scentquest.fragrance.fragrance.Fragrance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {


    @Query("""
            SELECT f FROM Favourite f
            WHERE f.user.id = :UserId
            """)
    List<Favourite> findAllByUserId(@Param("UserId") Integer userId);

    @Query("""
        SELECT f FROM Favourite f
        WHERE f.fragrance.FragranceId = :fragranceId AND f.user.id = :userId
        """)
    Optional<Favourite> findAllByFragranceIdAndUserId(@Param("fragranceId") Integer fragranceId, @Param("userId") Integer userId);
    @Query("""
            SELECT (Count(*) > 0) AS isAlreadyFavourite
            FROM Favourite f
            WHERE f.fragrance.FragranceId = :fragranceId AND f.user.id = :userId
            """)
    boolean isAlreadyFavourite(@Param("fragranceId") Integer fragranceId, @Param("userId") Integer userId);

    @Query("""
            SELECT f.fragrance FROM Favourite f
            WHERE f.user.id = :userId AND
            f.fragrance.recommendedSeason LIKE CONCAT('%', :season, '%') AND
            (LOWER(f.fragrance.name) LIKE CONCAT('%', LOWER(:searchWord), '%') OR
            LOWER(f.fragrance.brand) LIKE CONCAT('%', LOWER(:searchWord), '%'))
            """)
    Page<Fragrance> findAllFavoriteFragrancesByUserId(Pageable pageable, @Param("userId") Integer userId, @Param("season") String season, @Param("searchWord") String searchWord);

    @Query("""
            DELETE FROM Favourite f
            WHERE f.fragrance.FragranceId = :fragranceId
            """)
    @Modifying
    void deleteByFragranceId(Integer fragranceId);

}
