package toolguys.library.library.repository.user.hoya;

import org.springframework.data.jpa.repository.JpaRepository;
import toolguys.library.library.domain.BookReserve;

public interface UserBookReservRepository extends JpaRepository<BookReserve, Long>{
  
}
