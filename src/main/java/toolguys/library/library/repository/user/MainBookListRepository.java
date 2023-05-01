package toolguys.library.library.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import toolguys.library.library.domain.Book;

@Repository
public interface MainBookListRepository extends JpaRepository<Book, Long>{
    List<Book> findTop5ByOrderByBookWriterDesc();
}
