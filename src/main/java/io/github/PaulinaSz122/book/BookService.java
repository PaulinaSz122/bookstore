package io.github.PaulinaSz122.book;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    List<Book> findAll() {
        return repository.findAll();
    }
}
