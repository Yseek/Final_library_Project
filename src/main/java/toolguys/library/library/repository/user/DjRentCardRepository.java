package toolguys.library.library.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.Member;
import toolguys.library.library.domain.RentCard;

public interface DjRentCardRepository extends JpaRepository <RentCard, Long> {
    List<RentCard> findByMemberSeq(Member member);
}
