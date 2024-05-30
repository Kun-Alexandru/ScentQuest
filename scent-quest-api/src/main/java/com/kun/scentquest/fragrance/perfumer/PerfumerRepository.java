package com.kun.scentquest.fragrance.perfumer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PerfumerRepository extends JpaRepository<Perfumer, Integer> {

    @Query("SELECT p FROM Fragrance f JOIN f.perfumers p WHERE f.FragranceId = :fragranceId")
    List<Perfumer> findPerfumersByFragranceId(Integer fragranceId);

    @Query("SELECT p FROM Perfumer p")
    List<Perfumer> getAll();

}
