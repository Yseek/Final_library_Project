package toolguys.library.library.service.user;

import java.util.List;

import toolguys.library.library.domain.Book;

public interface MybooklistService {
    List<Book> getMybooklistS(long memberSeq);
}
