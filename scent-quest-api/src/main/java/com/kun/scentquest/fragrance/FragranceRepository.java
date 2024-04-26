package com.kun.scentquest.fragrance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FragranceRepository extends JpaRepository<Fragrance, Integer>, JpaSpecificationExecutor<Fragrance> {
    @Query("""
            SELECT f FROM Fragrance f
            """)
    Page<Fragrance> findAllFragrancesPageable(Pageable pageable);

    @Query("SELECT DISTINCT f FROM Fragrance f JOIN f.notes n WHERE n.name = :noteName")
    Page<Fragrance> findAllByNotesName(Pageable pageable, String noteName);


    @Query("SELECT DISTINCT f FROM Fragrance f JOIN f.perfumers p WHERE p.Id = :perfumerId")
    Page<Fragrance> findAllByPerfumerId(Pageable pageable, Integer perfumerId);
}
