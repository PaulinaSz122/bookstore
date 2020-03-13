package io.github.PaulinaSz122.description;

import io.github.PaulinaSz122.book.BookServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/description")
public class DescriptionServlet {
    private final Logger logger = LoggerFactory.getLogger(DescriptionServlet.class);

    private DescriptionService service;

    public DescriptionServlet(DescriptionService service) {
        this.service = service;
    }

    @GetMapping("/findOneDescription")
    DescriptionDTO findOneDescription (@RequestParam("book_id") Integer bookId){
        logger.info("Got request");
        return service.findByBookId(bookId);
    }
}
