package com.kun.scentquest.feedback;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
}