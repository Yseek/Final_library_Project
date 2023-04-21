package toolguys.library.library.service.user.hoya;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import toolguys.library.library.domain.Book;

public interface UserBookListServiceInterface {
  Page<Book> bookListByBook(Pageable pageable);
  Book bookDetail(Long bookSeq);
}
