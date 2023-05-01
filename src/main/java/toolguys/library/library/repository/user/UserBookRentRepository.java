package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.BookRent;

public interface UserBookRentRepository extends JpaRepository<BookRent, Long>{
	
}
