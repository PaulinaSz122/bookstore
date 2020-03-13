package io.github.PaulinaSz122.book;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    List<Book> findAll() {
        return repository.findAll();
    }
    Optional<Book> findOneById(Integer id) { return repository.findById(id); }
}
