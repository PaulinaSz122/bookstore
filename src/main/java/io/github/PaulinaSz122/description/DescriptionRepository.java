package io.github.PaulinaSz122.description;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DescriptionRepository extends JpaRepository<Description, Integer> {
    Description findDescriptionByBookId(Integer book_id);
}
