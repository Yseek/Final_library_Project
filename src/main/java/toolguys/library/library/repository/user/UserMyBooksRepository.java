package toolguys.library.library.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import toolguys.library.library.domain.MyBooks;

public interface UserMyBooksRepository extends JpaRepository<MyBooks, Long>{
	
}
