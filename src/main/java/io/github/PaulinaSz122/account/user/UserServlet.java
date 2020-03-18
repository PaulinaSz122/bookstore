package io.github.PaulinaSz122.account.user;

import io.github.PaulinaSz122.book.Book;
import io.github.PaulinaSz122.book.BookServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class UserServlet {
    private final Logger logger = LoggerFactory.getLogger(BookServlet.class);
    private UserService service;

    public UserServlet(UserService service) {
        this.service = service;
    }

    @GetMapping("/basket")
    List<Book> getBasket(@RequestParam("userId") Integer userId){
        logger.info(userId.toString());
        return service.getBasket(userId);
    }
}
