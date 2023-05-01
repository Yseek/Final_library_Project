package toolguys.library.library.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.MainBookListRepository;

@Service
public class MainBookListImpl implements MainBookService {

    @Autowired
    private final MainBookListRepository mainbooklistrepository;

    public MainBookListImpl(MainBookListRepository mainbooklistrepository){
        this.mainbooklistrepository = mainbooklistrepository;
    }

    @Override
    public List<Book> booklist() {
        return mainbooklistrepository.findTop2ByOrderByBookSeqDesc();
    }
}
