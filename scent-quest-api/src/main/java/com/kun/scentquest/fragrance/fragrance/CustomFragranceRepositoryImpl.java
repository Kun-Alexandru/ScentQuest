package com.kun.scentquest.fragrance.fragrance;

import com.kun.scentquest.feedback.reaction.ReactionRepository;
import com.kun.scentquest.feedback.review.ReviewRepository;
import com.kun.scentquest.fragrance.favorite.FavouriteRepository;
import com.kun.scentquest.fragrance.owned.OwnedRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;

public class CustomFragranceRepositoryImpl implements CustomFragranceRepository<Integer>{

    private final ReactionRepository reactionRepository;
    private final ReviewRepository reviewRepository;
    private final FavouriteRepository favouriteRepository;
    private final OwnedRepository ownedRepository;
    private final EntityManager entityManager;

    public CustomFragranceRepositoryImpl(ReactionRepository reactionRepository, ReviewRepository reviewRepository, FavouriteRepository favouriteRepository, EntityManager entityManager, OwnedRepository ownedRepository) {
        this.reactionRepository = reactionRepository;
        this.reviewRepository = reviewRepository;
        this.favouriteRepository = favouriteRepository;
        this.entityManager = entityManager;
        this.ownedRepository = ownedRepository;
    }

    @Override
    public void deleteById(Integer fragId) {

        reviewRepository.deleteByFragrance_FragranceId(fragId);
        reactionRepository.deleteByFragrance_FragranceId(fragId);
        favouriteRepository.deleteByFragranceId(fragId);
        ownedRepository.deleteByFragranceId(fragId);

        entityManager.createQuery("""
            delete from Fragrance 
            where FragranceId = :fragId
            """)
                .setParameter("fragId", fragId)
                .executeUpdate();
    }
}
