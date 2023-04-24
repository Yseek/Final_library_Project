package toolguys.library.library.service.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.dto.admin.BookHopeDTO;

public interface AdminBookHopeServiceYSH {
    Page<BookHope> BookHopeListAll(Pageable pageable);
    BookHope bookHopeRead(long seq);
    void bookHopeConvertingByBook(BookHopeDTO bookHopeDTO);
    void bookHopeDeny(long seq);
}
