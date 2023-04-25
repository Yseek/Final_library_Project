package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.BookRent;

public interface MybookrentService {
    List<BookRent> getMybookrentS(HashMap<String, Object> input);
    void prolongMybookrentS(BookRent bookrent);
    long getTotalCountS(long memberSeq);
}