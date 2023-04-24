package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Book;

public interface BookListRepository extends JpaRepository<Book, Long>{
    
}
