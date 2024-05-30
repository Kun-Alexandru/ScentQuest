package com.kun.scentquest.feedback.reaction;

import com.kun.scentquest.feedback.reaction.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {

    @Query("""
            SELECT r
            FROM Reaction r
            WHERE r.fragrance.FragranceId = :fragranceId
            AND r.user.id = :userId
    """)
    Optional<Reaction> findReactionByFragrance_FragranceIdAndUser_Id(Integer fragranceId, Integer userId);

    @Query("""
            SELECT r
            FROM Reaction r
            WHERE r.fragrance.FragranceId = :fragranceId
    """)
    List<Reaction> findAllByFragrance_FragranceId(Integer fragranceId);

    @Query("""
            SELECT r
            FROM Reaction r
            WHERE r.user.id = :userId
    """)
    List<Reaction> findAllByUser_Id(Integer userId);

}