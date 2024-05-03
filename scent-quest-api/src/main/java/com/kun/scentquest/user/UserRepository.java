package com.kun.scentquest.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @Query("""
            SELECT u FROM User u
            """)
    Page<User> findAllUsersPageable(Pageable pageable);

    @Query("""
    SELECT u FROM User u
    WHERE LOWER(u.firstname) LIKE CONCAT('%', LOWER(:searchWord), '%') OR
    LOWER(u.lastname) LIKE CONCAT('%', LOWER(:searchWord), '%') OR
    LOWER(u.email) LIKE CONCAT('%', LOWER(:searchWord), '%')
""")
    Page<User> findAllUsersBySearchWord(String searchWord, Pageable pageable);

    @Query("""
    SELECT u FROM User u
    WHERE u.accountLocked = :accountLocked AND 
    (LOWER(u.firstname) LIKE CONCAT('%', LOWER(:searchWord), '%') OR 
    LOWER(u.lastname) LIKE CONCAT('%', LOWER(:searchWord), '%') OR 
    LOWER(u.email) LIKE CONCAT('%', LOWER(:searchWord), '%'))
""")
    Page<User> findAllUsersBySearchWordAndAccountLock(String searchWord, boolean accountLocked, Pageable pageable);

}
