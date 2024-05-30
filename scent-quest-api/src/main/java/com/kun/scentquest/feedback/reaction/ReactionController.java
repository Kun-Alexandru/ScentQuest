package com.kun.scentquest.feedback.reaction;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("reactions")
@RequiredArgsConstructor
@Tag(name = "reaction", description = "The reaction API")
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping
    public ResponseEntity<Integer> saveReaction(
            @Valid @RequestBody ReactionRequest request
    ) {
        return ResponseEntity.ok(reactionService.addReaction(request.type(), request.userId(), request.fragranceId()));
    }

    @GetMapping("{userId}")
    public List<ReactionResponse> getReactionsByUserId(
            @PathVariable(name = "userId") Integer userId
    ) {
        return reactionService.findAllReactionsByUserId(userId);
    }

}
