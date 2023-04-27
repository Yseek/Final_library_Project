package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.BookLost;

public interface UserBookLostRepository extends JpaRepository<BookLost, Long>{
    
}
