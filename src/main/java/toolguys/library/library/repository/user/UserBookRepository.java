package toolguys.library.library.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Book;

public interface UserBookRepository extends JpaRepository<Book, Long>{
    List<Book> findByBookTitleAndBookWriterAndBookPub(String bookTitle, String bookWriter, String bookPub);
}
