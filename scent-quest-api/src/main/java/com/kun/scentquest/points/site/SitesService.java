package com.kun.scentquest.points.site;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.points.site.Sites;
import com.kun.scentquest.points.site.SitesRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SitesService {

    private final SitesRepository sitesRepository;

    public Sites save(Sites sites) {
        return sitesRepository.save(sites);
    }

    public Sites findById(Integer id) {
        return sitesRepository.findById(id).orElse(null);
    }

    public void deleteById(Integer id) {
        sitesRepository.deleteById(id);
    }

    public List<Sites> findAll() {
        return sitesRepository.findAll();
    }

    public PageResponse<Sites> findAllPaged(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("site").ascending());
        Page<Sites> sites = sitesRepository.findAllSitesPaged(pageable);
        List<Sites> sitesResponse = sites.stream().toList();
        return new PageResponse<>(
                sitesResponse,
                sites.getNumber(),
                sites.getSize(),
                sites.getTotalElements(),
                sites.getTotalPages(),
                sites.isFirst(),
                sites.isLast());
    }
}
