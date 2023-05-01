package toolguys.library.library.repository.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.AdminBookRentVo;
import toolguys.library.library.dto.admin.AdminMemberVo;

public interface AdminMemberRepositoryLdaew extends JpaRepository<Member, Long> {
	@Query(value = "select * from MEMBER where MEMBERSEQ like %:keyword%", nativeQuery = true)
	Page<Member> findByMemberSeqContaining(@Param("keyword") String keyword, Pageable pageable);

	Page<Member> findByMemberEmailContaining(String keyword, Pageable pageable);

	// 책번호 검색(최근 이 책을 빌린 회원 목록)
	@Query(value = "select MEMBERSEQ, MEMBERNAME, MEMBEREMAIL, MEMBERSTATUS " +
			"from MEMBER mb join RENTCARD rc on mb.MEMBERSEQ = rc.MEMBER_MEMBERSEQ " +
			"join BOOKRENT br on rc.RENTCARDSEQ = br.RENTCARD_RENTCARDSEQ " +
			"join BOOK b on b.BOOKSEQ = br.BOOK_BOOKSEQ " +
			"where BOOKSEQ like %:keyword% and BOOKRENTRDATE > DATE_ADD(NOW(), INTERVAL -7 DAY)", nativeQuery = true)
	Page<AdminMemberVo> findByBookSeqContaining(@Param("keyword") String keyword, Pageable pageable);

	// 선택한 회원의 대출 현황(현재 대출중인 책 목록) 가져온다
	@Query(value = "select BOOKSEQ, BOOKTITLE, BOOKWRITER, BOOKPUB, BOOKSTATUS " +
			"from MEMBER mb join RENTCARD rc on mb.MEMBERSEQ = rc.MEMBER_MEMBERSEQ " +
			"join BOOKRENT br on rc.RENTCARDSEQ = br.RENTCARD_RENTCARDSEQ " +
			"join BOOK b on b.BOOKSEQ = br.BOOK_BOOKSEQ " +
			"where MEMBERSEQ = :memberSeq and BOOKSTATUS = 3", nativeQuery = true)
	Page<AdminBookRentVo> findBookRentList(@Param("memberSeq") long memberSeq, Pageable pageable);

	// 선택한 회원의 대출 기록(모든 대출 목록) 가져온다
	@Query(value = "select BOOKSEQ, BOOKTITLE, BOOKWRITER, BOOKPUB, BOOKSTATUS " +
			"from MEMBER mb join RENTCARD rc on mb.MEMBERSEQ = rc.MEMBER_MEMBERSEQ " +
			"join BOOKRENT br on rc.RENTCARDSEQ = br.RENTCARD_RENTCARDSEQ " +
			"join BOOK b on b.BOOKSEQ = br.BOOK_BOOKSEQ " +
			"where MEMBERSEQ = :memberSeq", nativeQuery = true)
	Page<AdminBookRentVo> findBookRentHistory(@Param("memberSeq") long memberSeq, Pageable pageable);

}
