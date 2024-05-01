package com.kun.scentquest.fragrance.Note;

import org.springframework.stereotype.Service;

@Service
public class NoteMapper {

    public NoteResponse toNoteResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .name(note.getName())
                .description(note.getDescription())
                .aromaProfile(note.getAromaProfile())
                .intensityLevel(note.getIntensityLevel())
                .build();
    }


}
