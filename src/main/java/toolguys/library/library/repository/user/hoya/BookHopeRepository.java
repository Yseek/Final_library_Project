package toolguys.library.library.repository.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;

public interface BookHopeRepository extends JpaRepository<BookHope, Long>{
  Page<BookHope> findAllByMember(Member member, Pageable pageable);
}
