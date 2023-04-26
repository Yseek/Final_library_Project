package toolguys.library.library.repository.user.hoya;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.BookReserve;

public interface UserBookReservRepository extends JpaRepository<BookReserve, Long>{
  List<BookReserve> findByBookAndReservationDateIsNull(Book book);
}
