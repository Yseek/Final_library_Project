package toolguys.library.library.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.BookListRepository;

@Service
public class BookListServiceImpl { 

    @Autowired
    private final BookListRepository booklistRepository;

    public BookListServiceImpl(BookListRepository booklistRepository){
        this.booklistRepository = booklistRepository;
    }

    public List<Book> booklist() {
        return booklistRepository.findAll();
    }
    
}
