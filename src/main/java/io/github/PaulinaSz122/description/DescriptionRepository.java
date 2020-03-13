package io.github.PaulinaSz122.description;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DescriptionRepository extends JpaRepository<Description, Integer> {
    Description findDescriptionByBookId(@Param("id") Integer book_id);
}
