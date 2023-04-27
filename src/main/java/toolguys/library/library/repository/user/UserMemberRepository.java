package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Member;

public interface UserMemberRepository extends JpaRepository<Member, Long>{
    
}
