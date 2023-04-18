package toolguys.library.library.service.admin;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.BookDTO;

import java.util.List;

public interface AdminServicePKS {
    List<BookDTO> selectAll();

    List<BookDTO> listBySearch(String keyword);

    BookDTO searchByBookId(long seq);
}
