package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Member;

public interface DjMemberRepository extends JpaRepository <Member, Long>{
    Member findByMemberEmail(String memberemail);
}
