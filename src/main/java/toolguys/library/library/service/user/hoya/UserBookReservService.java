package toolguys.library.library.service.user.hoya;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.BookReserve;
import toolguys.library.library.domain.Member;
import toolguys.library.library.repository.user.hoya.UserBookReservRepository;

@Service
@RequiredArgsConstructor
public class UserBookReservService implements UserBookReservServiceInterface{

  public final UserBookReservRepository userBookReservRepository;

  @Override
	public Page<BookReserve> bookReservByBookReserve(Pageable pageable) {
		return userBookReservRepository.findAll(pageable);
	}

	@Transactional
	public String deleteBookReserve(long bookReserveSeq) {
		userBookReservRepository.deleteById(bookReserveSeq);
		return "ok";
	}

	public boolean bookReserve(Book bookSeq, Member memberSeq) {
		BookReserve bookReserve = new BookReserve();
		bookReserve.setBook(bookSeq);
		bookReserve.setMember(memberSeq);
		//bookReserve.setBookReserveDDay();

		try {
			userBookReservRepository.save(bookReserve);
				return true;
		} catch (Exception e) {
				return false;
		}
}
}
