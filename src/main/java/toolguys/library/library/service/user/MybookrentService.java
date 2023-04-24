package toolguys.library.library.service.user;

import java.util.List;

import toolguys.library.library.domain.BookRent;

public interface MybookrentService {
    List<BookRent> getMybookrentS(long memberSeq);
    void prolongMybookrentS(BookRent bookrent);
}