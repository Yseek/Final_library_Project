package toolguys.library.library.repository.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import toolguys.library.library.domain.Member;

public interface AdminMemberRepositoryLdaew extends JpaRepository<Member, Long>{
	@Query(value="select * from MEMBER where MEMBERSEQ like %:keyword%", nativeQuery = true)
    Page<Member> findByMemberSeqContaining(@Param("keyword")String keyword, Pageable pageable);
	Page<Member> findByMemberEmailContaining(String keyword, Pageable pageable);
	@Query(value="select * from MEMBER where MEMBERSEQ like %:keyword%", nativeQuery = true)
    Page<Member> findByBookSeqContaining(@Param("keyword")String keyword, Pageable pageable);

}
