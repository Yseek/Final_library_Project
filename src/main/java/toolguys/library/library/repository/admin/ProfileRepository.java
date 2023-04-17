package toolguys.library.library.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Member;

public interface ProfileRepository extends JpaRepository<Member, Long>{
    
}
