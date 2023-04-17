package toolguys.library.library.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Member;

public interface SecurityMemberRepository extends JpaRepository<Member, Long>{
	Optional<Member> findByMemberEmail(String memberEmail);
}
