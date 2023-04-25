package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.Book;

public interface MybooklistService {
    List<Book> getMybooklistS(HashMap<String, Object> input);
    long getTotalCountS(long memberSeq);
}
