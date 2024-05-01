package com.kun.scentquest.fragrance.Note;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteResponse {

    Integer id;
    String name;
    String description;
    String aromaProfile;
    String intensityLevel;

}
