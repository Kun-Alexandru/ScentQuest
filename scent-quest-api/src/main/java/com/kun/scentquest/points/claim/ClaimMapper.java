package com.kun.scentquest.points.claim;
import com.kun.scentquest.points.claim.Claim;
import org.springframework.stereotype.Service;

@Service
public class ClaimMapper {

    public static ClaimResponse toClaimResponse(Claim claim) {
        return ClaimResponse.builder()
                .ClaimId(claim.getId())
                .UserId(claim.getUser().getId())
                .points(claim.getPoints())
                .type(claim.getType())
                .fragName(claim.getFragName())
                .claimDate(claim.getClaimDate().toString())
                .build();
    }

}
