package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.hoya.UserBookListRepository;

@Service
@RequiredArgsConstructor
public class UserBookListService implements UserBookListServiceInterface {

  public final UserBookListRepository userBookListRepository;

  @Override
	public Page<Book> bookListByBook(Pageable pageable) {
		return userBookListRepository.findAll(pageable);
	}


  @Transactional(readOnly = true)
	public Book bookDetail(Long bookSeq) {
		return userBookListRepository.findById(bookSeq).orElseThrow(() -> new IllegalStateException("없는 책 입니다"));
	}
}
