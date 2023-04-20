package toolguys.library.library.repository.user.hoya;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Book;

public interface BookListRepository extends JpaRepository<Book, Long>{
  List<Book> findByBookTitleContaining(String keyword);
}
