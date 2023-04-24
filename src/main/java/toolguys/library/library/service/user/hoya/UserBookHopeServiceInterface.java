package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;

public interface UserBookHopeServiceInterface {
  Page<BookHope> listBookHopeByMember(Member member, Pageable pageable);
  Member findMember(long memberSeq);
  void deleteBookHope(long bookHopeSeq);
}
