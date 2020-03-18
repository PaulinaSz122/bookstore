package io.github.PaulinaSz122.account.user;

import io.github.PaulinaSz122.book.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    List<Book> getBasket(Integer userId) {
        if (repository.findById(userId).isPresent()) {
            return repository.findById(userId).get().getBasket();
        } else {
            return null;
        }
    }
}
