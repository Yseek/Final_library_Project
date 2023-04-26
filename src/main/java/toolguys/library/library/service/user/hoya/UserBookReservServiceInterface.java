package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookReserve;

public interface UserBookReservServiceInterface {
  Page<BookReserve> bookReservByBookReserve(Pageable pageable);
}
