package toolguys.library.library.service.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookHope;

public interface AdminBookHopeServiceYSH {
    Page<BookHope> BookHopeListAll(Pageable pageable);
    BookHope bookHopeRead(long seq);
}
