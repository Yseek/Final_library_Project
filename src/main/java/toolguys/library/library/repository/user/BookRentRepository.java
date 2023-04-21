package toolguys.library.library.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.BookRent;
import toolguys.library.library.domain.RentCard;

public interface BookRentRepository extends JpaRepository<BookRent, Long> {
    List<BookRent> findByRentCard(List<RentCard> rentCard);
}
