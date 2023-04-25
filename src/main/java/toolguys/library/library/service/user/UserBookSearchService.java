package toolguys.library.library.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.UserBookSearchRepository;

@Service
public class UserBookSearchService {

	@Autowired
	UserBookSearchRepository userBookSearchRepository;

	public List<Book> searchBook(String bookTitle){
		return userBookSearchRepository.findByBookTitleContaining(bookTitle);
	}
}
