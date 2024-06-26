package com.kun.scentquest.points.site;

import com.kun.scentquest.points.site.Sites;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SitesRepository extends JpaRepository<Sites, Integer> {

    @Query("""
            SELECT s FROM Sites s
            """)
    Page<Sites> findAllSitesPaged(Pageable pageable);

}
