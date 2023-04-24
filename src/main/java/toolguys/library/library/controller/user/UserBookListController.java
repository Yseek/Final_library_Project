package toolguys.library.library.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.service.user.BookListServiceImpl;

@RestController
public class UserBookListController {

    @Autowired
    BookListServiceImpl booklistservice;

    @GetMapping("booklist")
    public List<Book> booklist(){
        return booklistservice.booklist();
    }
}

