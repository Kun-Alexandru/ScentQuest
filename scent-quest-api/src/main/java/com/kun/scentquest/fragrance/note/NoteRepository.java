package com.kun.scentquest.fragrance.note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {


    @Query("SELECT n FROM Fragrance f " +
            "JOIN f.notes n " +
            "WHERE f.FragranceId = :fragranceId")
    List<Note> findAllNotesByFragranceId(Integer fragranceId);

    @Query("SELECT n FROM Note n")
    List<Note> getAll();


}
