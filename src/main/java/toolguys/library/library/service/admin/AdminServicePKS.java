package toolguys.library.library.service.admin;

import java.util.List;

import toolguys.library.library.dto.admin.BookDTO;

public interface AdminServicePKS {
    List<BookDTO> selectAll();

    List<BookDTO> listBySearch(String keyword);

    BookDTO searchByBookId(long seq);

    List<BookDTO> selectBookInfo(String title, String writer, String pub);
}
