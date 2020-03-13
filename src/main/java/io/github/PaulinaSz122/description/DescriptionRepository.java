package io.github.PaulinaSz122.description;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DescriptionRepository extends JpaRepository<Description, Integer> {
    @Query(value = "SELECT * FROM descriptions WHERE book_id = :id", nativeQuery = true)
    Description findDescriptionByBookId(@Param("id") Integer book_id);
}
