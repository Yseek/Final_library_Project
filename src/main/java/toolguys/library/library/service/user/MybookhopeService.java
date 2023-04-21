package toolguys.library.library.service.user;

import java.util.List;

import toolguys.library.library.domain.BookHope;

public interface MybookhopeService {
    List<BookHope> getMybookhopeS(long memberSeq);
}
