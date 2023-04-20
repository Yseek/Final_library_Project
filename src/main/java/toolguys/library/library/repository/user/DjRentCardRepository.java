package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.RentCard;

public interface DjRentCardRepository extends JpaRepository <RentCard, Long> {
    RentCard findByMemberSeq( member);
}
