package com.kun.scentquest.fragrance.fragrance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface FragranceRepository extends JpaRepository<Fragrance, Integer>, JpaSpecificationExecutor<Fragrance>, CustomFragranceRepository<Integer> {
    @Query("""
            SELECT f FROM Fragrance f
            """)
    Page<Fragrance> findAllFragrancesPageable(Pageable pageable);

    @Query("SELECT DISTINCT f FROM Fragrance f JOIN f.notes n WHERE n.name = :noteName")
    Page<Fragrance> findAllByNotesName(Pageable pageable, String noteName);


    @Query("SELECT DISTINCT f FROM Fragrance f JOIN f.perfumers p WHERE p.Id = :perfumerId")
    Page<Fragrance> findAllByPerfumerId(Pageable pageable, Integer perfumerId);

    @Query("""
        SELECT f FROM Fragrance f
        WHERE ((LOWER(f.name) LIKE CONCAT('%', LOWER(:searchWord), '%'))
        OR (LOWER(f.brand) LIKE CONCAT('%', LOWER(:searchWord), '%')))
        AND f.recommendedSeason LIKE CONCAT('%', :season, '%')
        
       """)
    Page<Fragrance> findAllFragrancesBySearchWord(String searchWord, String season, Pageable pageable);


    @Query("""
        SELECT f FROM Fragrance f
        WHERE f.adder.id = :userId
        """)
    Page<Fragrance> findAllFragrancesByOwner(Integer userId, Pageable pageable);

    @Query("SELECT f FROM Fragrance f " +
            "JOIN f.notes n " +
            "LEFT JOIN f.notes un " +
            "WITH un.name IN :unwantedNoteNames " +
            "WHERE n.name IN :noteNames AND f.gender LIKE CONCAT('%', :gender, '%') AND f.recommendedSeason LIKE CONCAT('%', :season, '%') AND f.FragranceId NOT IN :unwantedFragranceIds " +
            "GROUP BY f " +
            "HAVING COUNT(DISTINCT n.id) = :noteCount AND COUNT(DISTINCT un.id) = 0")
    Page<Fragrance> findFragrancesByNotesAndGenderAndSeason(@Param("noteNames") List<String> noteNames,
                                                            @Param("noteCount") long noteCount,
                                                            @Param("unwantedNoteNames") List<String> unwantedNoteNames,
                                                            @Param("gender") String gender,
                                                            @Param("season") String season,
                                                            @Param("unwantedFragranceIds") List<Integer> unwantedFragranceIds,
                                                            Pageable pageable);

    @Query("SELECT f FROM Fragrance f " +
            "LEFT JOIN f.notes un " +
            "WITH un.name IN :unwantedNoteNames " +
            "WHERE f.gender LIKE CONCAT('%', :gender, '%') " +
            "AND f.recommendedSeason LIKE CONCAT('%', :season, '%') " +
            "AND f.FragranceId NOT IN :unwantedFragranceIds " +
            "GROUP BY f " +
            "HAVING COUNT(DISTINCT un.id) = 0")
    Page<Fragrance> findAllByGenderAndSeasonExcludingUnwantedNotes(@Param("unwantedNoteNames") List<String> unwantedNoteNames,
                                                                   @Param("gender") String gender,
                                                                   @Param("season") String season,
                                                                   @Param("unwantedFragranceIds") List<Integer> unwantedFragranceIds,
                                                                   Pageable pageable);

}
