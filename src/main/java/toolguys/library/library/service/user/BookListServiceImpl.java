package toolguys.library.library.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.BookListRepository;
@Service
public class BookListServiceImpl implements BookListService{

    @Autowired
    BookListRepository bookListRepository;

    public BookListServiceImpl(BookListRepository bookListRepository){
        this.bookListRepository = bookListRepository;
    }


    public List<Book> booklist() {
        return bookListRepository.findAll();
    }
    
}
