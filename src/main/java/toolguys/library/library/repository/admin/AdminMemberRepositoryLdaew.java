package toolguys.library.library.repository.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import toolguys.library.library.domain.Member;

public interface AdminMemberRepositoryLdaew extends JpaRepository<Member, Long> {
	@Query(value = "select * from MEMBER where MEMBERSEQ like %:keyword%", nativeQuery = true)
	Page<Member> findByMemberSeqContaining(@Param("keyword") String keyword, Pageable pageable);

	Page<Member> findByMemberEmailContaining(String keyword, Pageable pageable);

	@Query(value = "select MEMBERSEQ, MEMBERNAME, MEMBEREMAIL, MEMBERSTATUS " +
			"from MEMBER mb join RENTCARD rc on mb.MEMBERSEQ = rc.MEMBER_MEMBERSEQ " +
			"join BOOKRENT br on rc.RENTCARDSEQ = br.RENTCARD_RENTCARDSEQ " +
			"join BOOK b on b.BOOKSEQ = br.BOOK_BOOKSEQ " +
			"where BOOKSEQ like %:keyword% and BOOKRENTRDATE > DATE_ADD(NOW(), INTERVAL -7 DAY)", nativeQuery = true)
	Page<Member> findByBookSeqContaining(@Param("keyword") String keyword, Pageable pageable);
}
