package io.github.PaulinaSz122.account.user;

import io.github.PaulinaSz122.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

//    @Query(value = "select books.id, title, author, price from books, basket where basket.user_id = :user_id and books.id = basket.book_id",
//        nativeQuery = true)
//    List<Book> getBooksInBasket(@Param("user_id") Integer userId);
}
