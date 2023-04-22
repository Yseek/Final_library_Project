package toolguys.library.library.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.service.user.BookServiceImpl;

@RestController
public class UserBooksController {

    @Autowired
    BookServiceImpl booksservice;

    @GetMapping("bookslist")
    public List<Book> bookslist(){
        return booksservice.bookslist();
    }
}
