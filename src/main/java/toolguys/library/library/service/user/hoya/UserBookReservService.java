package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.BookReserve;
import toolguys.library.library.repository.user.hoya.UserBookListRepository;
import toolguys.library.library.repository.user.hoya.UserBookReservRepository;
import toolguys.library.library.security.repository.SecurityMemberRepository;

@Service
@RequiredArgsConstructor
public class UserBookReservService implements UserBookReservServiceInterface {

	public final UserBookReservRepository userBookReservRepository;

	public final UserBookListRepository userBookListRepository;

	public final SecurityMemberRepository securityMemberRepository;

	@Override
	public Page<BookReserve> bookReservByBookReserve(Pageable pageable) {
		return userBookReservRepository.findAll(pageable);
	}

	@Transactional
	public String deleteBookReserve(long bookReserveSeq) {
		userBookReservRepository.deleteById(bookReserveSeq);
		return "ok";
	}
}
