package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.BookHope;

public interface MybookhopeService {
    List<BookHope> getMybookhopeS(HashMap<String, Object> input);
    long getTotalCountS(long memberSeq);
}
