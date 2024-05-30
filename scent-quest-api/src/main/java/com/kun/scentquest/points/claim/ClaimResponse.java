package com.kun.scentquest.points.claim;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClaimResponse {
    private Integer ClaimId;
    private Integer UserId;
    private int points;
    private String type;
    private String fragName;
    private String claimDate;
}
