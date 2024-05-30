package com.kun.scentquest.fragrance.fragrance;

import org.springframework.data.jpa.domain.Specification;

public class FragranceSpecification {

    public static Specification<Fragrance> withOwnerId(Integer ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("adder").get("id"), ownerId);
    }

}
