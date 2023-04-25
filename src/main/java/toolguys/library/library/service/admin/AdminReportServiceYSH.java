package toolguys.library.library.service.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Book;

public interface AdminReportServiceYSH {
    Page<Book> reportListAll(Pageable pageable);
}
