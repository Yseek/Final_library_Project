package toolguys.library.library.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.Member;
import toolguys.library.library.domain.MyBooks;
import toolguys.library.library.repository.user.UserBookRepository;
import toolguys.library.library.repository.user.UserMemberRepository;
import toolguys.library.library.repository.user.UserMyBooksRepository;

@Service
public class UserMyBooksService {

	@Autowired
	UserBookRepository userBookRepository;
	@Autowired
	UserMyBooksRepository userMyBooksRepository;
	@Autowired
	UserMemberRepository userMemberRepository;


	public UserMyBooksService(UserBookRepository userBookRepository, UserMyBooksRepository userMyBooksRepository,
			UserMemberRepository userMemberRepository) {
		this.userBookRepository = userBookRepository;
		this.userMyBooksRepository = userMyBooksRepository;
		this.userMemberRepository = userMemberRepository;
	}

	public Book findBook(String bookTitle, String bookWriter, String bookPub) {
		Book book = userBookRepository.findByBookTitleAndBookWriterAndBookPub(bookTitle, bookWriter, bookPub).get(0);
		return book;
	}

	public void addFavorite(Book book, Member member){
		MyBooks mybooks = new MyBooks();
		mybooks.setBook(book);
		mybooks.setMember(member);
		userMyBooksRepository.save(mybooks);
	}

	public Member findMember(long memberSeq){
		return userMemberRepository.findById(memberSeq).get();
	}
}
