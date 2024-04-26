package com.kun.scentquest.Feedback;

import com.kun.scentquest.Feedback.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
}