package com.kun.scentquest.feedback;

import com.kun.scentquest.fragrance.Favorite.Favourite;
import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import com.kun.scentquest.fragrance.Fragrance.FragranceRepository;
import com.kun.scentquest.user.User;
import com.kun.scentquest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final FragranceRepository fragranceRepository;
    private final UserRepository userRepository;

    public Integer addReaction(String type, Integer userId, Integer fragranceId) {

        Fragrance fragrance = fragranceRepository.findById(fragranceId)
                .orElseThrow(() -> new RuntimeException("Fragrance not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reaction reactinExists = reactionRepository.findReactionByFragrance_FragranceIdAndUser_Id(fragranceId, userId)
                .orElse(null);

        int no_of_likes;
        int no_of_dislikes;

        if(reactinExists == null) {
            reactinExists = new Reaction();
            reactinExists.setFragrance(fragrance);
            reactinExists.setUser(user);
            reactinExists.setType(type);
            if(type.equals("like")) {
                fragrance.setNumber_of_likes(fragrance.getNumber_of_likes() + 1);
                no_of_likes = fragrance.getNumber_of_likes();
            } else {
                fragrance.setNumber_of_dislikes(fragrance.getNumber_of_dislikes() + 1);
                no_of_likes = fragrance.getNumber_of_likes();
            }
            fragranceRepository.save(fragrance);
            reactionRepository.save(reactinExists).getId();
            return no_of_likes;
        } else {
            if(type.equals("like")) {
                if(reactinExists.getType().equals("like")) {
                    fragrance.setNumber_of_likes(fragrance.getNumber_of_likes() - 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("none");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                } else if (reactinExists.getType().equals("dislike")) {
                    fragrance.setNumber_of_likes(fragrance.getNumber_of_likes() + 1);
                    fragrance.setNumber_of_dislikes(fragrance.getNumber_of_dislikes() - 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("like");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                }
                else if(reactinExists.getType().equals("none")) {
                    fragrance.setNumber_of_likes(fragrance.getNumber_of_likes() + 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("like");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                }
            } else if(type.equals("dislike")) {
                if(reactinExists.getType().equals("dislike")) {
                    fragrance.setNumber_of_dislikes(fragrance.getNumber_of_dislikes() - 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("none");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                } else if (reactinExists.getType().equals("like")) {
                    fragrance.setNumber_of_likes(fragrance.getNumber_of_likes() - 1);
                    fragrance.setNumber_of_dislikes(fragrance.getNumber_of_dislikes() + 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("dislike");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                    }
                else if(reactinExists.getType().equals("none")) {
                    fragrance.setNumber_of_dislikes(fragrance.getNumber_of_dislikes() + 1);
                    no_of_likes = fragrance.getNumber_of_likes();
                    reactinExists.setType("dislike");
                    reactionRepository.save(reactinExists).getId();
                    return no_of_likes;
                }
                }
            }
        return 0;
    }

    public List<ReactionResponse> findAllReactionsByUserId(Integer userId) {
        List<Reaction> reactions = reactionRepository.findAllByUser_Id(userId);
        if(reactions.isEmpty()) {
            return Collections.emptyList();
        }
        else {
            return reactions.stream()
                    .map(reaction -> new ReactionResponse(reaction.getType(), reaction.getFragrance().getFragranceId()))
                    .collect(Collectors.toList());
        }

    }

}
