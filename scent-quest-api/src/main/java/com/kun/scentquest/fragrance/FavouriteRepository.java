package com.kun.scentquest.fragrance;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
