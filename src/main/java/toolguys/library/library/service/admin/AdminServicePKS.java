package toolguys.library.library.service.admin;

import toolguys.library.library.domain.Book;

import java.util.List;

public interface AdminServicePKS {
    List<Book> selectAll();

    List<Book> listBySearch(String keyword);

    Book searchByBookId(long seq);
}
