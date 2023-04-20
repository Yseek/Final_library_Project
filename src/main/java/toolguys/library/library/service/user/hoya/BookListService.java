package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.hoya.BookListRepository;

@Service
@RequiredArgsConstructor
public class BookListService implements BookListServiceInterface {

  public final BookListRepository bookListRepository;

  @Override
	public Page<Book> bookListByBook(Pageable pageable) {
		return bookListRepository.findAll(pageable);
	}


  @Transactional(readOnly = true)
	public Book bookDetail(Long bookSeq) {
		return bookListRepository.findById(bookSeq).orElseThrow(() -> new IllegalStateException("없는 책 입니다"));
	}
}
