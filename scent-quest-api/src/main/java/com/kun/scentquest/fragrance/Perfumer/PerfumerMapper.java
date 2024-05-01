package com.kun.scentquest.fragrance.Perfumer;

import org.springframework.stereotype.Service;

@Service
public class PerfumerMapper {

    public PerfumerResponse toPerfumerResponse(Perfumer perfumer) {
        return PerfumerResponse.builder()
                .id(perfumer.getId())
                .name(perfumer.getName())
                .dateOfBirth(perfumer.getDateOfBirth())
                .country(perfumer.getCountry())
                .shortDescription(perfumer.getShortDescription())
                .build();
    }


}
