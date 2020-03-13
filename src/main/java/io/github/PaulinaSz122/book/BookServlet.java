package io.github.PaulinaSz122.book;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookServlet {
    private final Logger logger = LoggerFactory.getLogger(BookServlet.class);

    private BookService service;

    public BookServlet(BookService service) {
        this.service = service;
    }

    @GetMapping("/all")
    ResponseEntity<List<Book>> findAllBooks() {
        logger.info("Got request");
        return ResponseEntity.ok(service.findAll());
    }
}
