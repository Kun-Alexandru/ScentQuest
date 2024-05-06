package com.kun.scentquest.feedback;
import com.kun.scentquest.user.User;
import com.kun.scentquest.user.UserResponse;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewFragranceResponse {

    private Integer id;
    private String text;
    private Integer rating;
    private LocalDateTime createdDate;
    private Integer createdBy;
    private Integer modifiedBy;
    private LocalDateTime modifiedAt;
    private UserResponse creator;

}
