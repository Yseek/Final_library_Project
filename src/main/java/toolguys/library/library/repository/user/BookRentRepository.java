package toolguys.library.library.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import toolguys.library.library.domain.BookRent;

import toolguys.library.library.dto.user.BookRentCheckDTO;

public interface BookRentRepository extends JpaRepository<BookRent, Long> {
    @Query(value = "select BOOKRENTSEQ, BOOKTITLE, BOOKWRITER, BOOKPUB, BOOKRENTRDATE, BOOKRENTDDAY, BOOKRENTRETURN, BOOKRENTCOIN " +
			"from BOOKRENT br join BOOK b on br.BOOK_BOOKSEQ = b.BOOKSEQ " +
			"join RENTCARD rc on rc.RENTCARDSEQ = br.RENTCARD_RENTCARDSEQ " +
			"join MEMBER m on m.MEMBERSEQ = rc.MEMBER_MEMBERSEQ " +
			"where MEMBEREMAIL=:memberemail", nativeQuery = true)
    Page<BookRentCheckDTO> findByEmail(@Param("memberemail") String memberemail, Pageable pageable);
}
