package toolguys.library.library.repository.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import toolguys.library.library.domain.Book;

public interface AdminBookRepositoryYSH extends JpaRepository<Book, Long>{
    @Query(value = "select b.BOOKSEQ, b.BOOKTITLE, b.BOOKWRITER, b.BOOKPUB, b.BOOKSTATUS, m.MEMBERNAME " +
            "from BOOK b join BOOKRENT br on b.BOOKSEQ = br.BOOK_BOOKSEQ " +
            "join RENTCARD rc on br.RENTCARD_RENTCARDSEQ = rc.RENTCARDSEQ " +
            "join MEMBER m on rc.MEMBER_MEMBERSEQ = m.MEMBERSEQ " +
            "where b.BOOKSTATUS in (4, 5)", nativeQuery = true)
    Page<Book> findByBookStatus(Pageable pageable);
}
