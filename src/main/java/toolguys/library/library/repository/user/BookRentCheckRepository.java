package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import toolguys.library.library.domain.BookRent;

@Repository
public interface BookRentCheckRepository extends JpaRepository<BookRent, Long> {
    
}
